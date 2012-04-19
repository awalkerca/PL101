
var melody1_mus = { tag: 'note', pitch: 'a4', dur: 125 };

var melody2_mus =
{ tag: 'seq',
    left:
    { tag: 'seq',
        left: { tag: 'note', pitch: 'a4', dur: 250 },
        right: { tag: 'note', pitch: 'b4', dur: 250 } },
    right:
    { tag: 'seq',
        left: { tag: 'note', pitch: 'c4', dur: 500 },
        right: { tag: 'note', pitch: 'd4', dur: 500 } } };


var melody3_mus =
{ tag: 'seq',
    left:
    { tag: 'par',
        left: { tag: 'note', pitch: 'c3', dur: 250 },
        right: { tag: 'note', pitch: 'g4', dur: 500 } },
    right:
    { tag: 'par',
        left: { tag: 'note', pitch: 'd3', dur: 500 },
        right: { tag: 'note', pitch: 'f4', dur: 250 } } };