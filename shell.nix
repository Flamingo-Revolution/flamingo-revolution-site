{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_24
    nodePackages.pnpm
    curl
    cacert
  ];

  # Node + wrangler honor this for outbound TLS (Neon, etc.).
  # Prefer the Nix-managed bundle so the path is stable inside nix-shell.
  env = {
    NODE_EXTRA_CA_CERTS = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
  };

  # NixOS has no prebuilt Prisma linux-nixos engines. Point the CLI at the
  # debian schema-engine that @prisma/engines downloads instead.
  #
  # workerd (astro Cloudflare local runtime) reads SSL_CERT_FILE / falls back
  # to /etc/ssl/cert.pem — which NixOS does not provide. Export via shellHook
  # so it wins over nixpkgs stdenv's own SSL_CERT_FILE handling.
  shellHook = ''
    engine="$(find "$PWD/node_modules/.pnpm" -path '*@prisma+engines@*/node_modules/@prisma/engines/schema-engine-debian-openssl-3.0.x' 2>/dev/null | head -n1)"
    if [ -n "$engine" ] && [ -x "$engine" ]; then
      export PRISMA_SCHEMA_ENGINE_BINARY="$engine"
    fi
    export PRISMA_CLI_BINARY_TARGETS=debian-openssl-3.0.x
    export SSL_CERT_FILE="${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
    export NODE_EXTRA_CA_CERTS="${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
  '';
}
