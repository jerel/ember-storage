# Ember Storage

A very simple but powerful way for managing data that you which to last
beyond a refresh. This add-on synchronizes data between browser tabs and is
observable.

[Live Demo](http://storage.jerel.co/)

[![Build Status](https://travis-ci.org/jerel/ember-storage.svg?branch=master)](https://travis-ci.org/jerel/ember-storage)

## Installation

* `git clone` this repository
* `npm install ember-storage`
* `bower install ember-storage`

## Usage

This service is injected into all routes and components as `storage`. You
may get, set, and observe data on `storage` just like a regular Ember Object:

    export default Ember.Component.extend({
      fullWidth: function() {
        return !this.get('storage.sideBarOpen');
      }.property('storage.sideBarOpen'),
      actions: {
        toggleMenu: function() {
        this.toggleProperty('storage.sideBarOpen');
        },
      },
    });

    // some component template
    <div id="sidebar" class="{{if storage.sideBarOpen 'open' ''}}">
      sidebar contents
    </div>

    <button {{action 'toggleMenu'}}>Toggle Sidebar</button>

## API

* `prefix` (property). Set a key prefix. Handy for saving user specific device config. Defaults to 'es'.
* `type` (property). Either 'session' or 'local'. Defaults to 'local'. Due to the way `sessionStorage` works tab sync does not work if type is set to 'session'.
* `clear` (function). Clear all data for the specified key. Defaults to the key currently set in `prefix`.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
