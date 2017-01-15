/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('App', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(App, 'onDeviceReady');
                App.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (App.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(App.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(App, 'receivedEvent');
            App.onDeviceReady();
            expect(App.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        describe('on called with deviceready', function() {
            it('should call DependencyLoader.insertScripts with GlobalConfig.javaScriptDependencies', function() {
                spyOn(DependencyLoader, 'insertScripts');
                App.receivedEvent('deviceready');
                expect(DependencyLoader.insertScripts.mostRecentCall.args[0]).toEqual(GlobalConfig.javaScriptDependencies);
            });
            it('should call GameObjectGenerator.generateByEngineName with GlobalConfig.gameEngineName and GlobalConfig.rootElementId',function() {
                spyOn(GameObjectGenerator, 'generateByEngineName');
                App.receivedEvent('dependenciesready');
                expect(GameObjectGenerator.generateByEngineName).toHaveBeenCalledWith(GlobalConfig.gameEngineName, GlobalConfig.rootElementId);
            });
        });
    });
});