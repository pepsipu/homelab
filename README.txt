============================================
pepsipu's federated internet! (pepsi.pw)
============================================

hello! this is my homelab, used to provide services to myself and friends.

--[ apps

apps can be one-off scripts or git submodules, placed under the apps directory. they do not provide a web interface.

--[ services

services are applications that serve users through web interface. the traefik router is configured to use the folder path to serve apps

--[ kubernetes

this folder contains cdktf code for parsing and scaffolding infra defined in apps and services