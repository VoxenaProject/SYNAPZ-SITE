# SYNAPZ — Brand Guide

> Ce document est la source unique de la marque SYNAPZ.
> Il peut etre transmis aux designers, marketeurs, copywriters et partenaires.

---

## A. Positionnement

**Nom :** SYNAPZ
**Tagline :** L'intelligence, activee.
**URL :** synapz.be
**Entite legale :** VVI CONSULTING — TVA BE1018193756

### Mission
Rendre l'IA accessible et rentable pour chaque PME en Belgique — en 72h, pas en 6 mois.

### Positionnement
SYNAPZ est la seule agence IA qui prouve d'abord, facture ensuite.
Pas de slide decks. Pas de consultants. Des resultats.

### Concept cle : "Impulsions IA"
Une **Impulsion IA** est une micro-automatisation ciblee sur un probleme metier concret.
Comme une synapse qui se connecte : rapide, precis, transformateur.

- Chaque Impulsion resout UN probleme specifique
- Delai : quelques jours (pas 6 mois)
- ROI mesurable des le premier mois
- Zero competence technique requise cote client

### Cible
Dirigeants de PME (5-50 personnes) en Belgique francophone.
Debordes par les taches operationnelles. Sceptiques envers la tech complexe.
Sensibles au ROI concret et au risque financier.

### Proposition de valeur
```
Audit gratuit (30 min) + premiere automatisation livree en 72h.
Si vous ne recuperez pas 5h/semaine en 30 jours — vous ne payez rien.
```

---

## B. Personnalite de marque

### Archetype
**Le Sage Pragmatique** — Expert qui simplifie. Jamais condescendant. Toujours concret.

### 4 traits
| Trait | Ce que c'est | Ce que ce n'est PAS |
|-------|-------------|---------------------|
| **Precis** | Chiffres, delais, garanties | Vague, "on verra" |
| **Audacieux** | "0 EUR pour commencer", "72h ou rembourse" | Timide, hesitant |
| **Accessible** | Langage simple, pas de jargon | Technique, pretentieux |
| **Concret** | Exemples reels, cas d'usage | Theorique, abstrait |

### Inspirations visuelles
- **Apple** : Minimalisme, whitespace, typographie comme design
- **Linear** : Tech aesthetic, dark mode, animations subtiles
- **Stripe** : Clarte du message, hierarchie visuelle parfaite
- **Vercel** : Dev-forward, gradients elegants, composants clean

---

## C. Identite visuelle

### Palette de couleurs

```
COULEUR           HEX         USAGE
---------------------------------------------------
Primaire          #7C3AED     CTAs, accents, energie. RARE.
Secondaire        #06B6D4     Highlights, accents. TRES RARE.
Accent light      #9D6FF0     Hover states, glows, degrades
Dark              #0F0F1A     Texte, headers. Quasi-noir.
Muted             #64748B     Texte secondaire, labels
Surface           #F5F7FF     Fonds de section alternatifs
Border            #E2E8F0     Separateurs, contours de cartes
White             #FFFFFF     Fond principal, cartes
```

**Regle d'or :**
Le violet est un accent rare, pas un fond. 80% du site est noir/blanc/gris.
Le violet apparait UNIQUEMENT sur :
- Les boutons CTA
- Les chiffres cles / stats
- Les interactions (hover, focus)
- Les elements de gradient text

Le cyan est encore plus rare — reserve aux highlights ponctuels.

### Gradient signature
```css
background: linear-gradient(135deg, #9D6FF0 0%, #7C3AED 50%, #06B6D4 100%);
```
Usage : Mots-cles dans les H2, gros chiffres, boutons speciaux.
JAMAIS en fond de section.

### Typographie

```
USAGE           FONT                  WEIGHT    TAILLE
----------------------------------------------------------
H1              Plus Jakarta Sans     800       56-72px
H2              Plus Jakarta Sans     800       40-48px
H3              Plus Jakarta Sans     700       24-32px
Subheading      Plus Jakarta Sans     600       18-20px
Body            Inter                 400       16-18px
Body accent     Inter                 500       16-18px
Labels/badges   Inter                 600       12-13px
Mono/data       JetBrains Mono        400       14px
```

**Regles typographiques :**
- H1 : `letter-spacing: -0.03em` (tracking serre = premium)
- H2 : `letter-spacing: -0.02em`
- H3 : `letter-spacing: -0.01em`
- Body : `line-height: 1.7` (lisibilite maximale)
- Labels : `text-transform: uppercase; letter-spacing: 0.05em`

### Espacement (Apple-style)

```
ELEMENT                    VALEUR
--------------------------------------
Section padding            128px (py-32)
Inter-section gap          64px minimum de whitespace visuel
Cards padding              32px (p-8) minimum
Container max-width        1024px (max-w-5xl)
Card border-radius         16px (rounded-2xl)
Button border-radius       12px (rounded-xl) ou full
Gap between elements       24-32px
```

---

## D. Principes de design

### 1. Un message par ecran
Pas de surcharge. Chaque section dit UNE seule chose.
Si on ne peut pas resumer la section en 5 mots, c'est trop.

### 2. Le vide est un luxe
Plus il y a de whitespace, plus le contenu parait premium.
Ne jamais remplir un espace "parce qu'il est vide".

### 3. La couleur est un privilege
90% monochrome. Le violet recompense l'attention.
Si tout est violet, rien ne l'est.

### 4. Le mouvement a un but
Animations subtiles : opacity 0->1 + translateY 20px.
Duration : 0.6-0.8s. Ease : cubic-bezier(0.25, 0.1, 0.25, 1).
PAS de bounce. PAS de spring exagere. PAS de rotation gratuite.

### 5. La typographie EST le design
Des titres massifs avec tracking serre.
Des contrastes de poids (800 vs 400).
La typo seule doit creer la hierarchie visuelle.

### 6. Chaque chiffre est une arme
Les stats sont grandes, colorees (gradient), impossibles a ignorer.
Un chiffre bien place vaut mieux que 3 paragraphes.

---

## E. Voix et ton

### Principes
- **Court. Direct.** Chaque mot compte.
- **Headlines :** 5-10 mots max. Percutant.
- **Body :** 2-3 phrases max par paragraphe.
- **Ton :** Confiant, pas arrogant. On prouve au lieu de dire.

### Structure de message
```
1. Probleme (le client se reconnait)
2. Consequence chiffree (ca fait mal)
3. Solution (SYNAPZ)
4. Preuve (garantie, chiffre, temoignage)
```

### Vocabulaire

**TOUJOURS utiliser :**
- "IA", "automatisation", "resultats"
- "Impulsion IA", "micro-automatisation"
- "72 heures", "0 EUR", "garanti"
- "PME", "votre business", "vos equipes"

**JAMAIS utiliser :**
- "LLM", "pipeline ML", "transformer", "NLP"
- "Revolutionnaire", "disruptif", "game-changer"
- "Nous sommes ravis de...", "Notre solution innovante..."
- "Leader de...", "Premier...", "Meilleur..."
- "Intelligence artificielle" seul (toujours "IA" ou detailler le benefice)

### Exemples

```
MAL  : "Notre solution innovante d'intelligence artificielle
        revolutionne la gestion des processus metier."

BIEN : "On automatise vos taches repetitives.
        Resultats en 72h — garanti."

MAL  : "Nous sommes ravis de vous presenter notre offre
        d'audit IA complementaire."

BIEN : "Audit gratuit. 30 minutes. Vous repartez avec
        un plan d'action — meme si on ne travaille jamais ensemble."
```

---

## F. Iconographie

### Style
- **Line icons** : stroke 1.5-2px, arrondis (linecap: round)
- **Couleur par defaut :** `#64748B` (muted)
- **Couleur active :** `#7C3AED` (violet)
- **Taille standard :** 20-24px
- **Format :** SVG inline (permet les animations pathLength)

### Regles
- Pas d'emoji dans les titres ni les badges
- Emoji autorisees UNIQUEMENT dans : messages WhatsApp, CTA informels, cookie banner
- Preferer les SVG inline animes (pathLength: 0 -> 1 sur scroll)
- Les icones ne doivent jamais attirer plus l'attention que le texte

---

## G. Composants signature

### Gradient text
```css
.gradient-text {
  background: linear-gradient(135deg, #9D6FF0 0%, #7C3AED 50%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
Usage : Le mot-cle principal dans chaque H2. Pas tout le titre.

### Pill badge
```
bg-[#7C3AED]/10 text-[#7C3AED] text-[11px] font-semibold
uppercase tracking-[0.05em] px-4 py-1.5 rounded-full
```
Usage : Tags de section ("Nos Impulsions IA", "L'offre", "FAQ")

### Glass card
```
bg-white/80 backdrop-blur-sm border border-[#E2E8F0]
rounded-2xl shadow-sm
```
Usage : Cards au-dessus de fonds textures

### Stat highlight
```
Chiffre : text-4xl font-extrabold gradient-text
Label : text-xs uppercase tracking-wider text-[#64748B] mt-1
```
Usage : Chiffres cles dans le hero et les sections stats

### Glow divider
```css
.glow-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #7C3AED40, transparent);
}
```
Usage : Separateur subtil entre les sous-sections

---

## H. Animations

### Motion par defaut (Framer Motion)
```tsx
// Fade in from bottom
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}

// Staggered children
transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
```

### Hover / Tap
```tsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.2 }}
```

### SVG icon draw
```tsx
initial={{ pathLength: 0 }}
whileInView={{ pathLength: 1 }}
transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
```

### Regles
- TOUJOURS `viewport={{ once: true }}` — pas de repetition au scroll
- Duration : 0.6-0.8s pour les apparitions
- Ease : `[0.25, 0.1, 0.25, 1]` (smooth ease-out)
- PAS de `type: "spring"` avec bounce visible
- Stagger : 0.08-0.12s entre les elements

---

## I. Responsive

### Breakpoints
```
Mobile    : < 768px   (1 colonne, padding reduit)
Tablet    : 768-1024px (2 colonnes)
Desktop   : > 1024px  (layout complet)
```

### Regles mobile
- Grilles 3 colonnes -> 1 colonne
- Grilles 2 colonnes -> 1 colonne
- H1 : text-4xl (au lieu de text-7xl)
- H2 : text-3xl (au lieu de text-5xl)
- Section padding : py-20 (au lieu de py-32)
- Cards : p-6 (au lieu de p-8)
- Les stat badges passent en flex-col

---

## J. Fichiers de reference

```
Logo dark (fond clair)   : public/logo/synapz-logo-dark.svg
Logo light (fond sombre) : public/logo/synapz-logo-light.svg
Logo PNG                 : public/logo/synapz-logo-dark.png
Favicon SVG              : public/favicon.svg
Favicon PNG              : public/logo/synapz-favicon.png
```

### Logo usage
- Navbar : `synapz-logo-dark.svg` — 146x32px
- Footer : `synapz-logo-dark.svg` — 128x28px
- Fond sombre : `synapz-logo-light.svg`
- Social media : `synapz-logo-dark.png`

---

## K. Contacts et assets

**Email :** hello@synapz.be
**WhatsApp Dejvi :** +32 483 596 627
**Site :** synapz.be
**Booking :** Via le site (BookingModal integre)

**Fondateurs :**
- **Dejvi Prifti** — CEO & Automatisation IA
- **Daniele Rutigliano** — Strategie IA & Conseil

---

*Derniere mise a jour : Fevrier 2026*
*Ce document est la propriete de VVI CONSULTING / SYNAPZ.*
