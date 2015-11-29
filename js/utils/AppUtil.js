/**
 * Created by rohitgirme on 11/22/15.
 */
define(
  function () {
    var INFO = 'INFO',
        WARN = 'WARN',
        ERROR = 'ERROR';

    var level = {
      INFO: 1,
      WARN: 2,
      ERROR: 3
    };

    return {

      LEVEL: level,

      setLogginLevel: function (logLevel) {
        if (typeof logLevel !== 'number' || logLevel <= 0) {
          this.error('Logging level must be a string');
          return;
        }
        this._loggingLevel = logLevel;
      },

      info: function (msg) {
        if (this._loggingLevel <= level.INFO) {
          this._log(INFO, msg);
        }
      },

      warn: function (msg) {
        if (this._loggingLevel <= level.WARN) {
          this._log(WARN, msg);
        }
      },

      error: function (msg) {
        if (this._loggingLevel <= level.ERROR) {
          this._log(ERROR, msg);
        }
      },

      _log: function (severity, msg) {
        var logMsg = '::' + msg;
        switch (severity) {
          case INFO:
            console.log(severity, logMsg);
            break;
          case WARN:
            if (console.warn) {
              console.warn(severity, logMsg);
            } else {
              console.log(severity, logMsg);
            }
            break;
          case ERROR:
            if (console.error) {
              console.error(severity, logMsg);
            } else {
              console.log(severity, logMsg);
            }
            break;
        }
      }

    }
  }
);
