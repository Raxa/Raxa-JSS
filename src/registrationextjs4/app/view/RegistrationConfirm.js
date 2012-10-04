/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * This script defines the view RegistrationConfirm of the registration module
 */
Ext.define('Registration.view.RegistrationConfirm', {
	//extend: 'Ext.Panel',
	extend: 'Ext.container.Container',
	requires: ['Registration.view.ConfirmFields'],
	alias: 'widget.registrationconfirm',
	border: 0,
	padding: 50,
	autoScroll: true,
	layout: {
		type: 'vbox',
		pack: 'center'
	},
	config: {
		items: [{
			xtype: 'panel',
			ui: 'raxa-panel',
			width: 800,
			padding: 20,
			// Title and fields
			items: [{
				xtype: 'confirmfields'
			}]
		},
		// Navigation Buttons
		{
			xtype: 'fieldset',
			padding: 10,
			border: false,
			items: [{
				xtype: 'button',
				margin: '0 0 0 400',
				text: 'Back',
				action: 'back'
			},
			{
				xtype: 'button',
				id: 'submitButton',
				margin: '0 0 0 30',
				text: 'Next',
				ui: 'raxa-aqua-small',
				action: 'submit'
			}]
		}]
	}
});

