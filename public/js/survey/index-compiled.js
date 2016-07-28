"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _ReactRedux = ReactRedux;
var connect = _ReactRedux.connect;

var generateId = function generateId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }return text;
};

var AddField = function AddField(_ref) {
  var type = _ref.type;
  var dispatch = _ref.dispatch;
  return React.createElement(
    "button",
    { href: "#",
      onClick: function onClick(e) {
        dispatch({
          type: 'ADD_FIELD',
          fieldType: type
        });
      }
    },
    ' + '
  );
};

AddField = connect()(AddField);

var DropdownSample = function DropdownSample() {
  return React.createElement(
    "div",
    { className: "field" },
    'Dropdown: ',
    React.createElement(
      "select",
      null,
      React.createElement(
        "option",
        null,
        "Option 1"
      ),
      React.createElement(
        "option",
        null,
        "Option 2"
      ),
      React.createElement(
        "option",
        null,
        "..."
      ),
      React.createElement(
        "option",
        null,
        "Option n"
      )
    )
  );
};

var RadioButtonSample = function RadioButtonSample() {
  return React.createElement(
    "div",
    { className: "field" },
    'Radio Buttons: ',
    React.createElement("input", { type: "radio", checked: true, readOnly: true }),
    " 1",
    React.createElement("input", { type: "radio" }),
    " 2",
    ' ... ',
    React.createElement("input", { type: "radio" }),
    " n"
  );
};

var AddTextInput = function AddTextInput() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { href: "#",
        onClick: function onClick(e) {
          store.dispatch({
            type: 'ADD_FIELD'
          });
        }
      },
      ' + '
    ),
    ' Text: ',
    React.createElement("input", { type: "text", placeholder: "Text" })
  );
};

var fieldCreator = function fieldCreator(type) {
  switch (type) {
    case 'dropdown':
      return {
        id: generateId(),
        fieldType: type,
        label: 'Dropdown',
        options: []
      };
    default:
      alert('something wrong');
  }
};

var removeOptionId = function removeOptionId(id, options) {
  var optionIndex = options.findIndex(function (option) {
    return option.id == id;
  });
  return [].concat(_toConsumableArray(options.slice(0, optionIndex)), _toConsumableArray(options.slice(optionIndex + 1)));
};

var addOption = function addOption(options, params) {
  return [].concat(_toConsumableArray(options), [{
    id: params.option_id,
    value: params.text
  }]);
};

var changeOptionText = function changeOptionText(id, options, text) {
  var optionIndex = options.findIndex(function (option) {
    return option.id == id;
  });
  var updateOption = {
    id: id,
    value: text
  };
  return [].concat(_toConsumableArray(options.slice(0, optionIndex)), [updateOption], _toConsumableArray(options.slice(optionIndex + 1)));
};

var field = function field(state, action) {
  switch (action.type) {
    case 'ADD_FIELD':
      return fieldCreator(action.fieldType);

    case 'ADD_OPTION':
      if (state.id !== action.field_id) {
        return state;
      }

      return _extends({}, state, {
        options: addOption(state.options, action)
      });
    case 'CHANGE_OPTION_TEXT':
      if (state.id !== action.field_id) {
        return state;
      }
      return _extends({}, state, {
        options: changeOptionText(action.option_id, state.options, action.text)
      });

    case 'REMOVE_OPTION':
      if (state.id !== action.field_id) {
        return state;
      }

      return _extends({}, state, {
        options: removeOptionId(action.option_id, state.options)
      });

    case 'LABEL_CHANGE':
      if (state.id !== action.field_id) {
        return state;
      }

      return _extends({}, state, {
        label: action.label
      });

    default:
      return state;
  }
};

var global = function global() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'TOGGLE_FIELD_EDIT':
      return _extends({}, state, {
        editing_field: action.field_id
      });
    default:
      return state;
  }
};

var fieldsInitState = [{ id: '765432', fieldType: 'dropdown', label: 'a', options: [{ id: '1', value: '1' }, { id: '2', value: '2' }] }, { id: '765431', fieldType: 'dropdown', label: 'b', options: [{ id: '1', value: 'c' }, { id: '2', value: 'd' }] }];

var fields = function fields() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? fieldsInitState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_FIELD':
      return [].concat(_toConsumableArray(state), [field(undefined, action)]);

    case 'ADD_OPTION':
      return state.map(function (t) {
        return field(t, action);
      });

    case 'CHANGE_OPTION_TEXT':
      return state.map(function (t) {
        return field(t, action);
      });

    case 'REMOVE_OPTION':
      return state.map(function (t) {
        return field(t, action);
      });

    case 'LABEL_CHANGE':
      return state.map(function (t) {
        return field(t, action);
      });
    default:
      return state;
  }
};

var _Redux = Redux;
var combineReducers = _Redux.combineReducers;

var surveyApp = combineReducers({
  global: global,
  fields: fields
});

var _React = React;
var Component = _React.Component;


var Input = function Input(_ref2) {
  var _onChange = _ref2.onChange;
  var _ref2$value = _ref2.value;
  var value = _ref2$value === undefined ? '' : _ref2$value;

  return React.createElement("input", {
    ref: function ref(node) {
      if (node !== null) {
        node.value = value;
      }
    },

    onChange: function onChange(event) {
      return _onChange(event.target.value);
    }
  });
};

var DropdownEdit = function DropdownEdit(_ref3) {
  var dispatch = _ref3.dispatch;
  var field = _ref3.field;
  var editing = _ref3.editing;
  return React.createElement(
    "div",
    {
      style: {
        display: editing ? 'block' : 'none'
      }
    },
    React.createElement(
      "p",
      null,
      "editing:"
    ),
    "Label:",
    React.createElement(Input, {
      onChange: function onChange(value) {
        dispatch({
          type: 'LABEL_CHANGE',
          field_id: field.id,
          label: value
        });
      },
      value: field.label
    }),
    React.createElement(
      "p",
      null,
      "options:"
    ),
    field.options.map(function (option) {
      return React.createElement(
        "div",
        { key: option.id },
        React.createElement(Input, {
          onChange: function onChange(value) {
            return dispatch({
              type: 'CHANGE_OPTION_TEXT',
              field_id: field.id,
              option_id: option.id,
              text: value
            });
          },
          value: option.value
        }),
        React.createElement(
          "button",
          { href: "#",
            onClick: function onClick() {
              return dispatch({
                type: 'REMOVE_OPTION',
                field_id: field.id,
                option_id: option.id
              });
            }
          },
          ' - '
        )
      );
    }),
    React.createElement(
      "button",
      { href: "#",
        onClick: function onClick() {
          return dispatch({
            type: 'ADD_OPTION',
            field_id: field.id,
            option_id: generateId(),
            text: ''
          });
        }
      },
      ' + '
    ),
    React.createElement("div", null)
  );
};

DropdownEdit = connect()(DropdownEdit);

var ToggleEdit = function ToggleEdit(_ref4) {
  var dispatch = _ref4.dispatch;
  var field_id = _ref4.field_id;
  var editing = _ref4.editing;

  return React.createElement(
    "button",
    {
      onClick: function onClick() {
        return dispatch({
          type: 'TOGGLE_FIELD_EDIT',
          field_id: editing ? undefined : field_id
        });
      }
    },
    editing ? 'done' : 'edit'
  );
};

ToggleEdit = connect()(ToggleEdit);

var Dropdown = function Dropdown(_ref5) {
  var field = _ref5.field;
  var editing = _ref5.editing;

  return React.createElement(
    "div",
    { className: "field" },
    field.label,
    " ",
    React.createElement(
      "span",
      null,
      ": "
    ),
    React.createElement(
      "select",
      null,
      field.options.map(function (option) {
        return React.createElement(
          "option",
          { key: option.id },
          option.value
        );
      })
    ),
    React.createElement(DropdownEdit, {
      field: field,
      editing: editing
    })
  );
};

var Form = function Form(_ref6) {
  var fields = _ref6.fields;
  var global = _ref6.global;

  return React.createElement(
    "ul",
    null,
    fields.map(function (field) {
      debugger;
      var editing = global.editing_field == field.id;
      switch (field.fieldType) {
        case 'dropdown':
          return React.createElement(
            "div",
            { key: field.id },
            React.createElement(Dropdown, { field: field, editing: editing }),
            React.createElement(ToggleEdit, {
              field_id: field.id,
              editing: editing
            })
          );

        default:
          alert('Something went wrong');
      }
    })
  );
};

var mapStateToFormProps = function mapStateToFormProps(state) {
  return {
    global: state.global,
    fields: state.fields
  };
};

Form = connect(mapStateToFormProps, null)(Form);

var SurveyApp = function (_Component) {
  _inherits(SurveyApp, _Component);

  function SurveyApp() {
    _classCallCheck(this, SurveyApp);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SurveyApp).apply(this, arguments));
  }

  _createClass(SurveyApp, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var global = _props.global;
      var fields = _props.fields;


      return React.createElement(
        "div",
        null,
        React.createElement(Form, null),
        "################################",
        React.createElement(
          "div",
          null,
          React.createElement(AddField, { type: "dropdown" }),
          React.createElement(DropdownSample, null)
        ),
        React.createElement(
          "div",
          null,
          React.createElement(AddField, { className: "field", type: "radio" }),
          React.createElement(RadioButtonSample, null)
        ),
        React.createElement(AddTextInput, null),
        "################################"
      );
    }
  }]);

  return SurveyApp;
}(Component);

var _ReactRedux2 = ReactRedux;
var Provider = _ReactRedux2.Provider;
var _Redux2 = Redux;
var createStore = _Redux2.createStore;


ReactDOM.render(React.createElement(
  Provider,
  { store: createStore(surveyApp) },
  React.createElement(SurveyApp, null)
), document.getElementById('root'));

store.subscribe(render);
render();
