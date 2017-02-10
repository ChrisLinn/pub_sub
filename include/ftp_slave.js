const Inotify = require('inotify').Inotify;

const FS      = require('fs');
const ZLib    = require('zlib');
const Timers  = require('timers');

// Time to wait for new events before firing event hooks
const EVENT_WAIT_PERIOD = 300;

class Listener
{
    constructor(ftpDir)
    {
        // The directory to watch for activity
        this.ftpDir          = ftpDir;
        // Hooks to fire after batches of events occur
        this.hooks           = [];
        // Map of files that have been touched
        // An object to prevent duplication
        this.filesToUpload   = {};
        // The timer/countdown handle from the last event until hook firing
        this.eventTimer      = null;
        // A handle for the inotify daemon
        this.listener        = null;
        // A descriptor for the individual directory watched
        this.watchDescriptor = null;
    }

    /**
     * Add an event hook to the listener, to fire after the timer expires after
     * the last event occurs
     */
    addHook(hook)
    {
        this.hooks.push(hook);
    }

    /**
     * Start the listener's service on the configured directory
     */
    start()
    {
        let dir = {
            path: this.ftpDir,
            watch_for: Inotify.IN_ALL_EVENTS,
            callback: (fileEvent) => { return this.onNotify(fileEvent) }
        };

        this.listener = new Inotify();
        this.watchDescriptor = this.listener.addWatch(dir);
    }

    /**
     * Configures the action to take when a file event occurs. When an event
     * occurs, a timer is started, or if the timer already exists,
     * reinitialised. When the timer expires, all the event hooks are fired in
     * order of their addition to the listener.
     */
    onNotify(fileEvent)
    {
        const mask = fileEvent.mask;

        // If a non-directory file is closed after writing, do...
        if (!(mask & Inotify.IN_ISDIR) && (mask & Inotify.IN_CLOSE_WRITE)) {
            console.log('File written');

            // Record the file in the map
            this.filesToUpload[fileEvent.name] = true;

            // Reset the timer if it has been set
            if (this.eventTimer) {
                clearTimeout(this.eventTimer);
            }

            console.log('Modified files', this.filesToUpload);

            // Configure the hooks to fire on the changed files in the directory
            // after the timer expires
            this.eventTimer = setTimeout(() => {
                let files = Object.keys(this.filesToUpload);
                for (let i=0; i<files.length; i++) {
                    let filePath = this.ftpDir + '/' + files[i];
                    FS.readFile(filePath, (err, data) => {
                        if (err) {
                            if (err.code === 'ENOENT') {
                                console.error('No such file:', filePath);
                                return;
                            }

                            throw err;
                        }

                        for (let i=0; i<this.hooks.length; i++) {
                            console.log('Calling hook', i);
                            this.hooks[i](data, filePath);
                        }
                    });
                }
            }, EVENT_WAIT_PERIOD);
        }
    }
}

module.exports.Listener = Listener;
