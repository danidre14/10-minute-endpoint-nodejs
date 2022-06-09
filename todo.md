## Task List

- [x] Generate random endpoint per user
- [x] Let endpoint expire after 10 minutes
- [x] Show expiry countdown on client
- [x] Add copy endpoint URL to clipboard function
- [x] Disable CORS on server side
- [x] Store endpoint in server database
- [ ] Delete expired endpoints from server database
- [ ] Log a maximum of 20 requests at a time per endpoint (new ones replacing old ones)
- [ ] Start logging endpoint requests
- [ ] Style everything
- [ ] Add HashNode and Linode attributions
- [ ] Format code

### Nice to have
- [ ] Send 429 (Too many requests) response when too many requests are sent within a given time
- [ ] Create websocket connection on main page to instnantly update logs per webhook request
- [ ] Add option to renew webhook expiry time back to 10 minutes
- [ ] Filter logged requests by method