# Tishuuuu Surprise Page

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- A single-page romantic interactive web app
- Floating animated hearts background (CSS animation)
- A romantic love paragraph: "Ladliiiiiii, chup chapppp meri cutieee shaadi kr lena mere se, because, ab tumsaa jaha me koi nhi h hum toh tumhare ho bethe. Love you Tishuuuu my cutuuuu"
- A central question card: "Did you forgive me my tishuuu, my sweety my babyyyyy? Please maan jaao"
- Two buttons: "Maan gyi 💖" and "Nhi manungi 😤"
- On hover of "Nhi manungi": button runs away (moves to a random position on screen so it cannot be clicked)
- On click of "Maan gyi": display a celebration overlay showing the generated meme image with confetti and a celebratory message
- Pink and white romantic color scheme throughout
- Fully touch/iPad compatible

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Build App.tsx as the single page with all romantic content
2. Implement floating hearts animation with CSS keyframes
3. Implement "runaway button" logic: on mouseenter/touchstart of "Nhi manungi", reposition it randomly to avoid cursor
4. Implement celebration overlay: on click of "Maan gyi", show full-screen overlay with meme image and confetti animation
5. Ensure touch events work on iPad/Chrome
6. Apply pink/white/rose color scheme with soft shadows and gradients
