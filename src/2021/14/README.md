## Day 14: Extended Polymerization

https://adventofcode.com/2021/day/14

If I split the string into pairs and let each pair grow there is a fast grow rate resulting in 2^n pairs each step

example: given a polymer of length 4 -> 3 pairs

- after 0 steps there will be `3 * 2^0 = 3` pairs -> l=4
- after 1 steps there will be `3 * 2^1 = 6` pairs -> l=7
- after 4 steps there will be `3 * 2^4 = 48` pairs -> l=49
- after 10 steps there will be `3 * 2^10 = 3072` pairs -> l=3073
- after 20 steps there will be `3 * 2^20 = 3145728` pairs -> l=3145729
- after 40 steps there will be `3 * 2^40 = 3298534883328` pairs -> l=3298534883329

So assuming one character takes 1 Byte the string after 20 steps would take 3MB or RAM, while the string after 40 steps would take 3 TB of RAM, what is completely out of reach, 30 steps would already be hard to tackle with a 3GB string.

So there must be a way to get to the result without actually building the very large string for 40 steps.

### Ideas

One could just calculate the unique pairs for the next steps with a counter how often they occcure. This should drastically decrease the required RAM
