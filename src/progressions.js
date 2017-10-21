const progressions = [
    // These assume major scale
    // Also, doesn't allow stuff like bII7
    // TODO: Convert to using something more versatile
    [
        // ii V7 I I
        {
            degree: 2,
            type: 'm7'
        },
        {
            degree: 5,
            type: '7'
        },
        {
            degree: 1,
            type: 'maj7'
        },
        {
            degree: 1,
            type: 'maj7'
        }
    ],
    [
        // I-vi-ii-V7
        {
            degree: 1,
            type: 'maj7'
        },
        {
            degree: 6,
            type: 'm7'
        },
        {
            degree: 2,
            type: 'm7'
        },
        {
            degree: 5,
            type: '7'
        }
    ]
];

module.exports = {
    getAll: () => progressions
};
