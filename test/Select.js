'use strict';

import dom from 'bower:metal/src/dom/dom';
import Dropdown from 'bower:steel-dropdown/src/Dropdown';
import Select from '../src/Select';

describe('Select', function() {
	var select;

	afterEach(function() {
		select.dispose();
	});

	it('should set "items" to an empty array by default', function() {
		select = new Select();
		select.render();
		assert.deepEqual([], select.items);
		assert.strictEqual(-1, select.selectedIndex);
	});

	it('should create values for items when only names are given', function() {
		select = new Select({
			items: ['First', 'Second']
		}).render();

		var expectedItems = [
			{
				name: 'First',
				value: 0
			},
			{
				name: 'Second',
				value: 1
			}
		];
		assert.deepEqual(expectedItems, select.items);
	});

	it('should render items inside dropdown', function() {
		select = new Select({
			items: ['First', 'Second', 'Third']
		}).render();

		var items = select.element.querySelectorAll('.dropdown-menu li');
		assert.strictEqual(3, items.length);
		assert.strictEqual('First', items[0].textContent);
		assert.strictEqual('Second', items[1].textContent);
		assert.strictEqual('Third', items[2].textContent);
	});

	it('should use the "btn btn-default" CSS class for the button by default', function() {
		select = new Select({
			items: ['First', 'Second', 'Third'],
			label: 'Foo'
		}).render();

		assert.ok(dom.hasClass(select.element.querySelector('button'), 'btn'));
		assert.ok(dom.hasClass(select.element.querySelector('button'), 'btn-default'));
	});

	it('should use the CSS class given by the `buttonClass` attr', function() {
		select = new Select({
			buttonClass: 'myClass',
			items: ['First', 'Second', 'Third'],
			label: 'Foo'
		}).render();

		assert.ok(dom.hasClass(select.element.querySelector('button'), 'myClass'));
	});

	it('should render given label inside button', function() {
		select = new Select({
			items: ['First', 'Second', 'Third'],
			label: 'Foo'
		}).render();

		assert.strictEqual('Foo', select.element.querySelector('button').textContent);
	});

	it('should render first item inside button if no label is given', function() {
		select = new Select({
			items: ['First', 'Second', 'Third']
		}).render();

		assert.strictEqual('First', select.element.querySelector('button').textContent);
	});

	it('should automatically select first item if no label is given', function() {
		select = new Select({
			items: ['First', 'Second', 'Third']
		}).render();

		assert.strictEqual(0, select.selectedIndex);
	});

	it('should render selected item inside button if there is one', function() {
		select = new Select({
			items: ['First', 'Second', 'Third'],
			label: 'Foo',
			selectedIndex: 1
		}).render();

		assert.strictEqual('Second', select.element.querySelector('button').textContent);
	});

	it('should set the hidden input\'s value as the selected item\'s value', function() {
		select = new Select({
			items: [
				{
					name: 'First',
					value: 'first'
				},
				{
					name: 'Second',
					value: 'second'
				}
			],
			label: 'Foo',
			selectedIndex: 1
		}).render();

		assert.strictEqual('second', select.element.querySelector('input[type="hidden"]').value);
	});

	it('should set the hidden input\'s name as specified by the `hiddenInputName` attr', function() {
		select = new Select({
			hiddenInputName: 'order',
			items: ['First', 'Second', 'Third']
		}).render();

		assert.strictEqual('order', select.element.querySelector('input[type="hidden"]').getAttribute('name'));
	});

	it('should create dropdown instance', function() {
		select = new Select({
			items: ['First', 'Second', 'Third']
		}).render();

		assert.ok(select.components[select.id + '-dropdown'] instanceof Dropdown);
	});

	it('should update button text when item is selected', function(done) {
		select = new Select({
			items: ['First', 'Second', 'Third']
		}).render();

		dom.triggerEvent(select.element.querySelectorAll('li')[1], 'click');
		select.components[select.id + '-dropdown'].once('attrsChanged', function() {
			assert.strictEqual('Second', select.element.querySelector('button').textContent);
			done();
		});
	});

	it('should update hidden input\'s value when item is selected', function(done) {
		select = new Select({
			items: [
				{
					name: 'First',
					value: 'first'
				},
				{
					name: 'Second',
					value: 'second'
				}
			],
		}).render();

		dom.triggerEvent(select.element.querySelectorAll('li')[1], 'click');
		select.components[select.id + '-dropdown'].once('attrsChanged', function() {
			assert.strictEqual('second', select.element.querySelector('input[type="hidden"]').value);
			done();
		});
	});

	it('should update `selectedIndex` attr when item is selected', function(done) {
		select = new Select({
			items: ['First', 'Second', 'Third']
		}).render();

		dom.triggerEvent(select.element.querySelectorAll('li')[1], 'click');
		select.components[select.id + '-dropdown'].once('attrsChanged', function() {
			assert.strictEqual(1, select.selectedIndex);
			done();
		});
	});
});
