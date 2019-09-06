import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from 'ember-power-select/test-support/helpers'

module('Integration | Component | bs form/element/control/power select multiple', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('options', ['foo', 'bar']);
    this.set('prop', ['foo']);
  });

  test('it renders as blockless element', async function(assert) {
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop" @options={{options}} />
    </BsForm>`);
    assert.dom('.ember-power-select-trigger').exists({ count: 1 });
    assert.dom(find('.ember-power-select-multiple-options').textContent.replace("×", "").trim(), 'foo');
    await clickTrigger();
    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom(findAll('.ember-power-select-option')[0]).hasText('foo');
    assert.dom(findAll('.ember-power-select-option')[1]).hasText('bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.deepEqual(this.get('prop'), ["foo", "bar"]);
  });

  test('it renders as blockless control component', async function(assert) {
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop" @options={{options}} as |el|>
        <el.control />
      </form.element>
    </BsForm>`);
    assert.dom('.ember-power-select-trigger').exists({ count: 1 });
    assert.equal(find('.ember-power-select-multiple-option').textContent.replace("×", "").trim(), 'foo');
    await clickTrigger();
    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom(findAll('.ember-power-select-option')[0]).hasText('foo');
    assert.dom(findAll('.ember-power-select-option')[1]).hasText('bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.deepEqual(this.get('prop'), ["foo", "bar"]);
  });

  test('it renders as block control component', async function(assert) {
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop" @options={{options}} as |el|>
        <el.control as |val|>
          {{val}}
        </el.control>
      </form.element>
    </BsForm>`);
    assert.dom('.ember-power-select-trigger').exists({ count: 1 });
    assert.equal(find('.ember-power-select-multiple-option').textContent.replace("×", "").trim(), 'foo');
    await clickTrigger();
    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom(findAll('.ember-power-select-option')[0]).hasText('foo');
    assert.dom(findAll('.ember-power-select-option')[1]).hasText('bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.deepEqual(this.get('prop'), ["foo", "bar"]);
  });

  test('it renders placeholder', async function(assert) {
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop2" @options={{options}} @placeholder="something" />
    </BsForm>`);
    assert.dom('.ember-power-select-placeholder').hasText('something');

    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop2" @options={{options}} @placeholder="something" as |el|>
        <el.control as |val|>
          {{val}}
        </el.control>
      </form.element>
    </BsForm>`);
    assert.dom('.ember-power-select-placeholder').hasText('something');
  });

  test('it renders placeholder (search enabled)', async function(assert) {
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop2" @options={{options}} @placeholder="something" as |el|>
        <el.control @searchEnabled={{true}} />
      </form.element>
    </BsForm>`);
    assert.dom('.ember-power-select-trigger-multiple-input').hasAttribute("placeholder", 'something');

    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop2" @options={{options}} @placeholder="something" as |el|>
        <el.control @searchEnabled={{true}} as |val|>
          {{val}}
        </el.control>
      </form.element>
    </BsForm>`);
    assert.dom('.ember-power-select-trigger-multiple-input').hasAttribute("placeholder", 'something');
  });

  test('it can disable select', async function(assert) {
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop" @options={{options}} @disabled={{true}} />
    </BsForm>`);
    assert.ok(find('.ember-power-select-trigger').getAttribute('aria-disabled'));

    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop" @options={{options}} @disabled={{true}} as |el|>
        <el.control as |val|>
          {{val}}
        </el.control>
      </form.element>
    </BsForm>`);
    assert.ok(find('.ember-power-select-trigger').getAttribute('aria-disabled'));
  });

  test('it can render array of objects with objectLabelPath', async function(assert) {
    this.set('options', this.get('options').map((title) => ({ title })));
    this.set('prop', [this.get('options')[0]]);
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop" @options={{options}} @optionLabelPath="title" />
    </BsForm>`);
    assert.dom('.ember-power-select-trigger').exists({ count: 1 });
    assert.equal(find('.ember-power-select-multiple-option').textContent.replace("×", "").trim(), 'foo');
    await clickTrigger();
    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom(findAll('.ember-power-select-option')[0]).hasText('foo');
    assert.dom(findAll('.ember-power-select-option')[1]).hasText('bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.deepEqual(this.get('prop'), this.get('options'));
  });

  test('it passes power-select @options', async function(assert) {
    await render(hbs`
    <BsForm @model={{this}} as |form|>
      <form.element @controlType="power-select-multiple" @property="prop2" @options={{options}} @placeholder="something" as |el|>
        <el.control @searchEnabled={{false}} @triggerClass="form-control" />
      </form.element>
    </BsForm>`);
    assert.dom('.form-control').exists();
    await clickTrigger();
    assert.dom('.ember-power-select-search-input').doesNotExist();
  });
});
