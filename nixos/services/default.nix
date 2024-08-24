{ config, pkgs, ... }:

{
  imports = [ ./kubernetes.nix ];

  services.openssh = {
    enable = true;
    settings.PasswordAuthentication = false;
  };
}
