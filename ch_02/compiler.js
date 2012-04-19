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

