# Blueprint Booking Implementation

## ✅ What's Been Implemented

### User Flow:
1. **Click "Get Your Blueprint Now"** → Opens qualification modal
2. **Fill qualification form** → Company info, team size, challenges, tools
3. **Optional add-on** → Add 30-min strategy session (+$250)
4. **Continue to Payment** → Creates Stripe Checkout session
5. **Payment via Stripe** → Secure checkout with card details
6. **Success page** → Confirmation + next steps + kickoff call instructions

### Features:
- ✅ Beautiful modal with company qualification form
- ✅ Stripe Checkout integration with custom metadata
- ✅ Optional strategy session add-on
- ✅ GA4 conversion tracking
- ✅ Success page with clear next steps
- ✅ Email confirmation (handled by Stripe)
- ✅ Phone number collection
- ✅ Billing address collection
- ✅ Promotion codes support

## 🔧 Setup Required

### 1. Add Stripe Environment Variable

Add to your `.env.local` file:

```bash
STRIPE_SECRET_KEY=sk_test_your_test_key_here  # For testing
# STRIPE_SECRET_KEY=sk_live_your_live_key_here  # For production
```

### 2. Get Your Stripe Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** (starts with `sk_test_`)
3. Add it to `.env.local`

### 3. Test the Flow

1. Start your dev server: `npm run dev`
2. Go to `/agency-automation-blueprint`
3. Click "Get Your Blueprint Now"
4. Fill in the form
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

### 4. Production Setup

Before going live:

1. Replace `sk_test_` with `sk_live_` key
2. Set up Stripe webhooks for post-payment actions:
   - Go to https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://seventeenlabs.io/api/webhooks/stripe`
   - Listen for: `checkout.session.completed`
3. (Optional) Add calendar booking link to success email
4. (Optional) Integrate with your CRM to save leads

## 📧 Post-Purchase Flow (Recommended)

### Immediate (Automated via Stripe):
- ✅ Payment confirmation email
- ✅ Receipt with invoice

### Manual (You handle):
1. **Welcome email** with calendar booking link
2. **Kickoff call** (30 min) to gather requirements
3. **Blueprint creation** (5-7 days)
4. **Delivery email** with PDF blueprint + Loom walkthrough
5. **(Optional) Strategy session** if purchased

### Suggested Email Sequence:

**Email 1: Welcome + Calendar Link (Immediate)**
```
Subject: Your Blueprint is on the way! Schedule your kickoff call

Body:
- Thank you for your purchase
- Link to calendar booking (Calendly/Cal.com)
- What to prepare for the call
- Expected timeline
```

**Email 2: Reminder (1 day before call)**
```
Subject: Your kickoff call is tomorrow

Body:
- Meeting details
- What we'll cover
- Preparation checklist
```

**Email 3: Blueprint Delivery (5-7 days)**
```
Subject: Your Agency Automation Blueprint is ready!

Body:
- PDF attachment with blueprint
- Loom video walkthrough
- Next steps for implementation
- Implementation pricing (if applicable)
```

## 🎯 Metadata Captured

The Stripe session stores:
- `companyName`
- `teamSize`
- `industry`
- `mainChallenge`
- `currentTools`
- `addStrategySession`
- `locale`
- `customer_email`
- `phone_number`
- `billing_address`

Access this data in Stripe Dashboard → Payments → Click payment → Metadata

## 🔌 Optional Integrations

### Send data to your CRM:
Add webhook handler at `/api/webhooks/stripe`:
```typescript
// When payment succeeds, send to HubSpot/Pipedrive/etc
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  await sendToHubSpot(session.metadata);
}
```

### Auto-send calendar link:
Use Stripe webhook to trigger email with Calendly link

### Notify team on Slack:
Post to Slack channel when new blueprint is purchased

## 🧪 Test Cards

Stripe test cards for different scenarios:

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
Insufficient funds: 4000 0000 0000 9995
```

## 📊 Tracking

GA4 events tracked:
1. `click_cta` - Button click
2. `form_submit` - Form completion
3. `begin_checkout` - Stripe redirect
4. `purchase` - Payment success

View in GA4: Events → Conversions

---

**Questions?** Check Stripe docs at https://stripe.com/docs/checkout/quickstart
