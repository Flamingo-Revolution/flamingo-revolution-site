import React, { useEffect, useState } from 'react';
import { createScoreCard, scoreCaption, gameUrl } from './scoreCard.js';
const emptyScores = [];
export default function ScoreShare({ score, scores = emptyScores }) {
  const [asset, setAsset] = useState(null);
  const [status, setStatus] = useState('');
  const [manual, setManual] = useState(false);
  const [busy, setBusy] = useState(false);
  const nativeShare = typeof navigator !== 'undefined'
    && typeof navigator.share === 'function'
    && (navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);
  const text = scoreCaption(score, scores, false);
  const payload = `${text}\n${gameUrl}`;
  const links = {
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}&quote=${encodeURIComponent(text)}`,
    WhatsApp: `https://wa.me/?text=${encodeURIComponent(payload)}`,
    X: `https://twitter.com/intent/tweet?text=${encodeURIComponent(payload)}`,
  };
  useEffect(() => {
    let active = true, objectUrl;
    setAsset(null); setStatus(''); setManual(false);
    createScoreCard(score, scores, true).then(blob => {
      if (!active) return;
      objectUrl = URL.createObjectURL(blob);
      setAsset({ preview: objectUrl, file: new File([blob], 'zogjte-renditja.png', { type: 'image/png' }), text });
    }).catch(() => { if (active) setStatus('Imazhi nuk u krijua. Mund të kopjosh rezultatin.'); });
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [score, scores, text]);
  const ready = asset && asset.text === text;
  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error('Unavailable');
      await navigator.clipboard.writeText(payload);
      setStatus('Rezultati dhe linku u kopjuan.'); return true;
    } catch { setManual(true); setStatus('Kopjo tekstin më poshtë.'); return false; }
  }
  async function share() {
    if (busy) return;
    if (nativeShare) {
      setBusy(true);
      try {
        const data = { title: 'Zogjtë e Axhituar — Renditja', text: payload };
        if (ready && navigator.canShare?.({ files: [asset.file] })) data.files = [asset.file];
        await navigator.share(data);
        setStatus('');
      }
      catch (error) { if (error.name !== 'AbortError') setStatus('Shpërndarja e telefonit nuk u hap. Provo përsëri ose shkarko imazhin.'); }
      finally { setBusy(false); }
      return;
    }
    const copied = await copy();
    if (copied) setStatus('Rezultati dhe linku u kopjuan. Mund t’i ngjitësh në aplikacionin që dëshiron.');
  }
  async function shareToDiscord() {
    window.open('https://discord.com/channels/@me', '_blank', 'noopener,noreferrer');
    const copied = await copy();
    if (copied) setStatus('Rezultati u kopjua. Ngjite në bisedën që dëshiron në Discord.');
  }
  function handleShareTrigger(event) {
    if (!nativeShare) return;
    event.preventDefault();
    void share();
  }
  return <div className="score-share">
    <div className="score-share-actions">
      <details className="score-share-menu">
        <summary aria-label="Shpërnda rezultatin" onClick={handleShareTrigger}>Shpërnda rezultatin</summary>
        <div className="score-share-panel" aria-label="Aplikacionet e shpërndarjes">
          <button type="button" onClick={copy}>Kopjo rezultatin</button>
          <a href={links.Facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <button type="button" onClick={shareToDiscord}>Discord</button>
          <a href={links.WhatsApp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={links.X} target="_blank" rel="noopener noreferrer">X</a>
        </div>
      </details>
      {ready && <a href={asset.preview} download={asset.file.name}>Shkarko figurën</a>}
    </div>
    <p role="status">{status}</p>
    {manual && <textarea aria-label="Rezultati për shpërndarje" readOnly value={payload} onFocus={event => event.target.select()} />}
  </div>;
}
