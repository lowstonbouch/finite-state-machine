class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
        this.config = config;
        if (!config) throw Error("Error");
        this.stateconfig = this.config.initial;
        this.undostateconfig = null;
        this.arr = [this.stateconfig];
        this.length = 0;
        this.pos = 0;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState()
    {

        return this.stateconfig;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.undostateconfig = this.stateconfig;
        if(state == 'normal' || state == 'hungry' || state == 'busy' || state =='sleeping')
        {
            this.stateconfig = state;
        }
        else {
            throw Error("Error");
        }
        this.arr.splice(this.pos + 1,this.length-this.pos,this.stateconfig);
        this.length = this.pos+1;
        this.pos++;
        return this.stateconfig;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        
        this.undostateconfig = this.stateconfig;
        if(this.stateconfig == 'normal' && event == 'study') {

            this.stateconfig = this.config.states[this.stateconfig].transitions[event];
            this.arr.splice(this.pos + 1,this.length-this.pos,this.stateconfig);
            this.length = this.pos+1;
            this.pos++;
            return this.stateconfig;
        }
        if(this.stateconfig == 'busy' && event == 'get_tired' || event =='get_hungry')
        {

            this.stateconfig = this.config.states[this.stateconfig].transitions[event];
            this.arr.splice(this.pos + 1,this.length-this.pos,this.stateconfig);
            this.length = this.pos+1;
            this.pos++;
            return this.stateconfig;
        }
        if (this.stateconfig == 'hungry' && event == 'eat')
        {

            this.stateconfig = this.config.states[this.stateconfig].transitions[event];
            this.arr.splice(this.pos + 1,this.length-this.pos,this.stateconfig);
            this.length = this.pos+1;
            this.pos++;
            return this.stateconfig;
        }
        if (this.stateconfig == 'sleeping') {
            if (event == 'get_hungry' || event == 'get_up') {

                this.stateconfig = this.config.states[this.stateconfig].transitions[event];
                this.arr.splice(this.pos + 1,this.length-this.pos,this.stateconfig);
                this.length = this.pos+1;
                this.pos++;
                return this.stateconfig;
            }
        }
            console.log("Error");
            throw Error("Error");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {


        this.stateconfig = this.config.initial;
        this.arr.splice(this.length + 1,0,this.stateconfig);
        this.length++;
        this.pos++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event)
        {
            return Object.keys(this.config.states);
        }
        if(event == 'study') return ['normal'];
        if(event == 'get_tired') return ['busy'];
        if(event == 'get_hungry') return ['busy','sleeping'];
        if(event == 'eat') return ['hungry'];
        if(event == 'get_up') return ['sleeping'];
        return [];

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

        if(this.length == 0 || this.pos == 0)
        {
            return false;
        }

        this.stateconfig = this.arr[this.pos-1];

        this.pos--;

            return true;

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.length == 0 || this.pos == this.length)
        {
            return false;
        }

        this.stateconfig = this.arr[this.pos + 1];
        this.pos++;
        return true;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.length =0;
        this.pos = 0;
        return this.arr.splice(0,this.length);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
