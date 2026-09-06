export function circleRectOverlap(cx, cy, radius, rect) {
  const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
  const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy < radius * radius;
}

export function pushOutCircleFromRect(circle, rect) {
  const rectCenterX = rect.x + rect.w / 2;
  const rectCenterY = rect.y + rect.h / 2;
  const dx = circle.x - rectCenterX;
  const dy = circle.y - rectCenterY;
  const overlapX = rect.w / 2 + circle.r - Math.abs(dx);
  const overlapY = rect.h / 2 + circle.r - Math.abs(dy);

  if (overlapX < overlapY) {
    circle.x += dx < 0 ? -overlapX : overlapX;
  } else {
    circle.y += dy < 0 ? -overlapY : overlapY;
  }
}