var Compiler = (function(){
    var Constr;

    Constr = function(){
        this.start = 0;
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
                    return time + this.endTime(time,expr.left) + this.endTime(time,expr.right);
                case 'par':
                    return time + Math.max(this.endTime(time,expr.left),this.endTime(time,expr.right));
                default:
                    throw {
                        name: 'TypeError',
                        message: 'Unknown expression tag'
                    };
            }
        },
        convertNameToMidi: function convertNameToMidi(noteName){
            var letters = {
              c: 0, //...semi-tone
              d: 2, //tone
              e: 4, //tone
              f: 5, //semi-tone
              g: 7, //tone,
              a: 9, //tone
              b: 11 //tone
            };
            return (12 + (12 * noteName[1] + letters[noteName[0]] ));
        },
        processNote: function processNote(startTime,expr){
            return {
                tag: expr.tag,
                pitch: this.convertNameToMidi(expr.pitch),
                dur: expr.dur,
                start: startTime
            };
        },
        processRest: function processRest(startTime, expr){
            return {
                tag: expr.tag,
                dur: expr.dur,
                start: startTime
            }
        },
        processExpr: function processExpr(startTime, expr){
            switch(expr.tag) {
                case 'note':
                    return [this.processNote(startTime,expr)];
                case 'rest':
                    return [this.processRest(startTime,expr)];
                case 'par':
                    return this.processExpr(startTime,expr.left).concat(this.processExpr(startTime,expr.right));
                case 'seq':
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
