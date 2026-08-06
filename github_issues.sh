#!/bin/bash
# create-issues.sh
# Replace REPO if needed.
REPO="valtq/valtq-site"

create_issue () {
TITLE="$1"
BODY="$2"
ASSIGNEE="$3"

gh issue create --repo "$REPO"   --title "$TITLE"   --body "$BODY"   --assignee "$ASSIGNEE"
}

create_issue "feat: Add Dark Mode Support" "$(cat <<'EOF'
# Context
The website currently supports only light mode. Implement a production-ready dark mode without changing the existing architecture.

# Requirements
- Reuse the existing design system.
- Add theme toggle in navbar.
- Persist preference in localStorage.
- Detect prefers-color-scheme on first visit.
- Support all pages/components.
- Maintain accessibility and responsive behavior.
- Avoid duplicated styles.

# Deliverables
- Complete dark mode implementation.
- Clean maintainable code.
- No regressions.

# Definition of Done
Dark mode works across the website and persists after refresh.
EOF
)" "mahmoudrabbas"

create_issue "feat: Implement Arabic / English Language Switcher" "$(cat <<'EOF'
# Context
Support both Arabic and English.

# Requirements
- Integrate i18n.
- Translate visible UI.
- Support RTL/LTR.
- Language switch in navbar.
- Preserve layout.

# Deliverables
Production-ready bilingual website.

# Definition of Done
All pages switch correctly.
EOF
)" "FatmaAli111"

create_issue "ui: Improve Hero Section" "$(cat <<'EOF'
# Context
Redesign hero to better represent ValtQ.

# Requirements
- Professional cover image.
- Better typography.
- Rewrite marketing copy.
- Improve CTA.
- Add subtle animations.
- Responsive.

# Done
Hero looks polished on all devices.
EOF
)" "marcoreda56-bot"

create_issue "ui: Redesign Timeline Section" "$(cat <<'EOF'
# Requirements
- Improve layout.
- Better spacing.
- Animations.
- Responsive.
- Consistent branding.
EOF
)" "Haithamgomaa"

create_issue "content: Improve Website Copy" "Rewrite placeholder text into professional marketing copy consistent with the ValtQ brand." "FatmaAli111"
create_issue "ui: Replace Placeholder Images" "Replace placeholders with optimized professional assets." "marcoreda56-bot"
create_issue "ui: Replace Icons with SVG Assets" "Replace temporary icons with optimized SVG icons." "Haithamgomaa"
create_issue "feat: Add Animations & Transitions" "Implement smooth entrance animations, hover states, and transitions while keeping performance high." "mahmoudrabbas"
create_issue "content: Populate Projects Section" "Add project cards including screenshots, tech stack, descriptions, and links." "Haithamgomaa"
create_issue "deploy: Deploy Website on Render" "Configure production deployment, environment variables, verify build, and ensure HTTPS." "mahmoudrabbas"
create_issue "infra: Configure Custom Domain" "Configure www.valtq.net DNS, SSL, redirects, and verify accessibility." "mahmoudrabbas"
create_issue "qa: Final Responsive Testing & Polish" "Perform final QA, fix UI bugs, optimize performance, and verify responsive behavior." "marcoreda56-bot"

echo "Done."
