/**
 * IF ALL ELSE FAILS......
 * Use Roids.
 * Roids is for failed connections, messed up tags
 * essentially a fool catcher
 */
const auraArray = [
    'trendy',
    'casual',
    'lively',
    'romantic',
    'inspired',
    'cheerful',
    'touristy',
];
const arraySize = auraArray.length;

const alchemicSteroids = () => {
    const dice = Math.floor(Math.random() * arraySize);
    return auraArray[dice];
}

module.exports = alchemicSteroids;