function EObject(){};
(function(){
  'use strict';

  function randomChar(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }
  EObject = function(Internals){
    Object.defineProperties(this, {
      '__DOM_EQ__': {
        value: (function(){
          let tid="";
          for(let c=0;c<50;c++){
            tid+=String.fromCharCode(Math.floor(Math.random() * 26) + 97);
          }
          let dom_el = document.createElement('div');
          dom_el.setAttribute('id',tid);
          return dom_el;
        })(),
        writable: true,
        enumerable: false
      },
      '__events__': {
        value: (function(){
          return {};
        })(),
        writable: true,
        enumerable: false
      },
      '__dom_events__': {
        value: (function(){
          return {};
        })(),
        writable: true,
        enumerable: false
      },
      '__addEventListener__': {
        value: function(eventName, callback){
          if(!this.__events__[eventName]){
            this.__events__[eventName] = [];
            Object.defineProperty(this.__events__[eventName], 'parent',{
              value: this,
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
          this.__events__[eventName].push(callback);
          return callback;
        },
        writable: false,
        enumerable: false
      },
      '__removeEventListener__': {
        value: function(eventName, callback){
          if(this.__events__[eventName]){
            this.__events__[eventName] = this.__events__[eventName].filter((e)=>{
              if(e != callback){
                return true;
              }else{
                return false;
              }
            });
            Object.defineProperty(this.__events__[eventName], 'parent',{
              value: this,
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
        },
        writable: false,
        enumerable: false
      },
      '__addDOMEventListener__': {
        value: function(eventName, callback){
          if(!this.__dom_events__[eventName]){
            this.__dom_events__[eventName] = [];
            Object.defineProperty(this.__dom_events__[eventName], 'parent',{
              value: this,
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
          this.__dom_events__[eventName].push(callback);
          document.addEventListener(eventName, callback);
          return callback;
        },
        writable: false,
        enumerable: false
      },
      '__removeDOMEventListener__': {
        value: function(eventName, callback){
          if(this.__dom_events__[eventName]){
            this.__dom_events__[eventName] = this.__dom_events__[eventName].filter((e)=>{
              if(e != callback){
                return true;
              }else{
                return false;
              }
            });
            document.removeEventListener(eventName, callback);
            Object.defineProperty(this.__dom_events__[eventName], 'parent',{
              value: this,
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
        },
        writable: false,
        enumerable: false
      },
      '__fireEvent__': {
        value: function(_EObject_, eventName, data){
          if(_EObject_.__events__[eventName]){
            for(let e in _EObject_.__events__[eventName]){
              _EObject_.__events__[eventName][e](data, this);
            }
          }
        },
        writable: false,
        enumerable: false
      }
    });
    if(Internals){
      if(typeof Internals == "object"){
        Object.keys(Internals).forEach((key)=>{
          this[key] = Internals[key];
        });
      }
    }
  };
})();
