# Bingo Game

## Project Overview
Bingo Game is a simple web-based game where users fill a 4x4 game board with 4-letter words, and then try to match the boxes when words are randomly displayed.  
At the top, there are 9 bonus boxes, and the speed at which words appear can be adjusted during the game.

## Tech Stack
- HTML
- CSS (using Flexbox for layout)
- JavaScript (DOM manipulation, event handling, fetch API)

## Features
1. **4x4 Game Board**  
   - Users can enter 4-letter words in each box  
   - Prevents duplicate words  
   - Only allows words from the predefined dictionary  

2. **Game Start (Start Button)**  
   - Requires all boxes to be filled before starting  
   - Random words appear, and correct matches change the box color  
   - Alerts “Bingo!” when a win condition is met  

3. **Word Rate Adjustment**  
   - “Increase Rate” button increases the chance of certain words appearing  

4. **Top 9 Bonus Boxes**  
   - Displays 9 small boxes at the top  
   - Evenly spaced, can be used for visual decoration or additional features  

5. **Warnings & Alerts**  
   - Displays messages for invalid input, duplicate words, or incomplete board  

## Project Structure
