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
  function getEventMap(){
    this.__eventMap = this.__eventMap || {};
    return this.__eventMap;
  }
  function validateEventExistence(name){
    let eventMap = getEventMap.call(this);
    if (typeof eventMap[name] === 'undefined') {
      throw new Error('The event "' + name + '" is not defined.');
    }
  }
  function shallowcopy(dest, source){
    if(!source){
      return dest;
    }

    for(let i in source){
      if(source.hasOwnProperty(i)){
        dest[i] = source[i];
      }
    }

    return dest;
  }
  function register(name, handler, opts){
    validateEventExistence.call(this, name);

    if (typeof handler !== 'function') {
      throw new Error('The handler of "' + name + '" should be a function.');
    }

    let eventMap = getEventMap.call(this);

    let info = shallowcopy({
      func: handler
    }, opts);

    eventMap[name].push(info);
  }

  Object.defineProperties(Object.prototype, {
    'defineEvent': {
      value: function(name){
        let eventMap = getEventMap.call(this);
        eventMap[name] = [];
        return this;
      },
      writable: true,
      enumerable: false
    },
    'on': {
      value: function(name, handler, opts){
        register.call(this, name, handler);
        return this;
      },
      writable: true,
      enumerable: false
    },
    'once': {
      value: function(name, handler){
        register.call(this, name, handler, {
          once: true
        });
        return this;
      },
      writable: true,
      enumerable: false
    },
    'trigger': {
      value: function(name/*, args ... */){
        validateEventExistence.call(this, name);

        let eventMap = getEventMap.call(this);

        let handlerInfos = eventMap[name].slice(), // use copied
          args = Array.prototype.slice.call(arguments, 1),
          i = 0,
          len = handlerInfos.length,
          info;

        for (let i = 0; i < len; i++) {
          info = handlerInfos[i];
          info.func.apply(this, args);

          if (info.once === true) {
            // splice from original array
            eventMap[name].splice(i, 1);
          }
        }

        return this;
      },
      writable: true,
      enumerable: false
    }
  });
})();

/*
Object.prototype.defineEvent = function(name){
  let eventMap = getEventMap.call(this);
  eventMap[name] = [];
  return this;
};

Object.prototype.on = function(name, handler, opts){
  register.call(this, name, handler);
  return this;
};

Object.prototype.once = function(name, handler){
  register.call(this, name, handler, {
    once: true
  });
  return this;
};

Object.prototype.trigger = function(name){
  validateEventExistence.call(this, name);

  let eventMap = getEventMap.call(this);

  let handlerInfos = eventMap[name].slice(), // use copied
    args = Array.prototype.slice.call(arguments, 1),
    i = 0,
    len = handlerInfos.length,
    info;

  for (let i = 0; i < len; i++) {
    info = handlerInfos[i];
    info.func.apply(this, args);

    if (info.once === true) {
      // splice from original array
      eventMap[name].splice(i, 1);
    }
  }

  return this;
};
*/
