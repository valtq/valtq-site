# Production Go-Live Checklist

## Pre-Launch

### Domain & DNS
- [ ] Domain name registered and configured
- [ ] DNS records pointing to Vercel
- [ ] SSL certificate active (auto via Vercel)
- [ ] www redirect configured (if needed)

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` set to production API URL
- [ ] `NEXT_PUBLIC_CAL_LINK` set to production Cal.com link
- [ ] API environment variables configured on hosting platform

### API Setup
- [ ] Database provisioned (PostgreSQL recommended for production)
- [ ] Database migrations run
- [ ] API deployed and accessible
- [ ] CORS configured for production domain

### Vercel Configuration
- [ ] Production branch set to `main`
- [ ] Preview deployments enabled for PRs
- [ ] Build settings verified

### Security
- [ ] Environment variables secured in Vercel
- [ ] API keys rotated for production
- [ ] Webhook secrets configured
- [ ] Rate limiting enabled

### Performance
- [ ] Images optimized
- [ ] Fonts preloaded
- [ ] Caching headers configured
- [ ] Core Web Vitals checked

### Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] Screen reader testing completed
- [ ] Keyboard navigation working

## Launch Day

- [ ] Final smoke test on production
- [ ] Monitor error logs
- [ ] Verify analytics tracking
- [ ] Test email notifications
- [ ] Test Cal.com booking flow

## Post-Launch

- [ ] Set up uptime monitoring
- [ ] Configure error tracking (Sentry)
- [ ] Set up log aggregation
- [ ] Document deployment process
