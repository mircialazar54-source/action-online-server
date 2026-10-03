# Action Online — multiplayer v0.1

Acesta este primul backend pentru meciuri 1v1:
- doi jucători caută meci;
- serverul creează o cameră;
- poziția și HP-ul sunt transmise celuilalt jucător;
- atacurile sunt transmise în timp real.

## Pornire server
Instalează Node.js, apoi:
`npm install`
`npm start`

Serverul ascultă implicit pe portul 8080.

## Următorul pas Android
În proiectul Android anterior, clientul trebuie conectat la adresa WebSocket a serverului (de exemplu `wss://domeniul-tau/...` după găzduire). Nu pun o adresă inventată: trebuie să avem un server găzduit înainte de testul online real.
