{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_24
    nodePackages.pnpm
    curl
  ];

  # NixOS has no prebuilt Prisma linux-nixos engines. Point the CLI at the
  # debian schema-engine that @prisma/engines downloads instead.
  shellHook = ''
    engine="$(find "$PWD/node_modules/.pnpm" -path '*@prisma+engines@*/node_modules/@prisma/engines/schema-engine-debian-openssl-3.0.x' 2>/dev/null | head -n1)"
    if [ -n "$engine" ] && [ -x "$engine" ]; then
      export PRISMA_SCHEMA_ENGINE_BINARY="$engine"
    fi
    export PRISMA_CLI_BINARY_TARGETS=debian-openssl-3.0.x
  '';
}
