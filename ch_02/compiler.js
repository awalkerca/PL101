var Compiler = (function(expr){
    var Constr;

    Constr = function(){
        this.start = 0;
        this.result = [];
    };

    Constr.prototype = {
        constructor: Compiler,
        reverse: function reverse(expr){
            if( expr.tag === 'note'){
                return expr;
            }else{
                return {
                    tag: 'seq',
                    left: reverse(expr.right),
                    right: reverse(expr.left)
                };
            }
        },
        endTime: function endTime(time, expr){
            switch(expr.tag){
                case 'note':
                    return time + expr.dur;
                case 'seq':
                    return time + endTime(time,expr.left) + endTime(time,expr.right);
                default:
                    throw {
                        name: 'TypeError',
                        message: 'Unknown expression seq'
                    };
            }
        },
        processNote: function processNote(time,expr){
            return {
                tag: expr.tag,
                pitch: expr.pitch,
                dur: expr.dur,
                start: time
            };
        },
        processExpr: function processExpr(startTime, expr){
            switch(expr.tag) {
                case 'note':
                    return [this.processNote(startTime,expr)];
                case "seq":
                    return this.processExpr(startTime,expr.left).concat(this.processExpr(this.endTime(startTime,expr.left),expr.right));
                default:
                    throw {
                         name: 'TypeError',
                        message: 'unknown expression tag'
                    };
            }
        },
       compile: function compile(expr){
          return this.processExpr(this.start,expr);
       }

    };
    return Constr;
}());

var compile = function(expr){
    var compiler = new Compiler();
    return compiler.compile(expr);
};



//TESTS
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