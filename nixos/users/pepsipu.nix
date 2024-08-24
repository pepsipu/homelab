{ config, pkgs, ... }:

{
  imports = [ ];

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.pepsipu = {
    isNormalUser = true;
    description = "Sammy Hajhamid";
    extraGroups = [ "networkmanager" "wheel" ];
    packages = with pkgs; [ ];
  };

  users.users.pepsipu.openssh.authorizedKeys.keys = [
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIB/3oIivHy39nv3kZLr9eEitCPLdZH3KIRsBe4dxBp8M"
  ];
}
