/* 
We are given two numbers n and m, and two-bit positions, i and j. Insert bits of m 
into n starting from j to i. Return the new resulting number.

Example
Input : n = 5 (00000000000000000000000000000101)
        m = 3 (00000000000000000000000000000011)
        i = 1
        j = 2;
Output : n = 7(00000000000000000000000000000111)
*/

function insertBits(n, m, i, j) {
  // Will be sequence of all ones
  // 11111111111111111111111111111111
  const allOnes = ~0;

  // 1s before position j, then 0s.
  // 11111111111111111111111111111000
  const left = allOnes << (j + 1);

  // 1's after position i.
  // 1 =            00000000000000000000000000000001
  // (1 << i) =     00000000000000000000000000000010
  // (1 << i) - 1 = 00000000000000000000000000000001
  const right = (1 << i) - 1;

  // Combine left and right to make mask. Mask is all 1s, except for 0s between i and j.
  // left =  11111111111111111111111111111000
  // right = 00000000000000000000000000000001
  // mask =  11111111111111111111111111111001
  const mask = left | right;

  // For n, use mask to set 0s between i and j
  // n =        00000000000000000000000000000101
  // mask =     11111111111111111111111111111001
  // nCleared = 00000000000000000000000000000001
  const nCleared = n & mask;

  // Shift bits in m to the left i times.
  // m =        00000000000000000000000000000011
  // mShifted = 00000000000000000000000000000110
  const mShifted = m << i;

  // M is now inserted into N, from bit j to bit i
  // nCleared = 00000000000000000000000000000001
  // mShifted = 00000000000000000000000000000110
  // return     00000000000000000000000000000111
  return nCleared | mShifted;
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Insert Bits", () => {
  it("works", () => {
    assert.equal(insertBits(1024, 19, 2, 6), 1100);
    assert.equal(insertBits(5, 3, 1, 2), 7);
  });
});

mocha.run();