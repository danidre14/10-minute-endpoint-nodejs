## Task List

- [x] Generate random endpoint per user
- [x] Let endpoint expire after 10 minutes
- [x] Show expiry countdown on client
- [x] Add copy endpoint URL to clipboard function
- [x] Disable CORS on server side
- [x] Store endpoint in server database
- [x] Delete expired endpoints from server database
- [x] Set up a timeout job that deletes expired endpoints
- [ ] Log a maximum of 20 requests at a time per endpoint (new ones replacing old ones)
- [x] Start logging endpoint requests
- [ ] Style everything
- [x] Show better date and time in logs
- [ ] Add proper footer
- [ ] Add proper header/hero
- [ ] Add proper side colours
- [x] Only add divs that are new logs that don't already exist in html
- [ ] Show "No logs" or "Empty" when no logs exist
- [ ] Server crashes over time because an existing connection forcibly closes by remote host using MongoDB atlas. Find way to instantly restart server in production
- [ ] Get favicons for drop downs
- [ ] Fix styles on small devices
- [x] Add button/link to refresh page when endpoint is expired
- [ ] Add HashNode and Linode attributions
- [ ] Format code

### Nice to have
- [ ] Send 429 (Too many requests) response when too many requests are sent within a given time
- [ ] Create SSE connection on main page to instnantly update logs per webhook request
- [ ] Add option to renew webhook expiry time back to 10 minutes
- [ ] Filter logged requests by method