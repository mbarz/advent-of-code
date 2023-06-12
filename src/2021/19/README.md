https://adventofcode.com/2021/day/19

In the puzzle input there are 30 scanners
each of the scanners detected 26 beacons

a scanner covers a cube of 2000x2000x2000
a scanner can have 24 different orientations

12 scanned beacons have to overlap to get relative position between two scanners

Clearly trying all the 24x2000x2000x2000 overlaps to check if two scanners overlap is too much

one possible strategy to check overlaps between 2 scan results would be to try for every orientation of one result to move every point of the one result to every point of the other result and count the overlaps. With that simple test there would be 24x26x26=16224 possibilities to check
