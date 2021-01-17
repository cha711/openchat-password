import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import copy from 'copy-to-clipboard';

type FormState = {
  su: number;
  customRadio: string;
};

const App = () => {
  // State
  const [password, setPassword] = React.useState('');
  const [display, setDisplay] = React.useState('none');

  const { register, handleSubmit, errors } = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { su: 8, customRadio: '1' },
  });

  // パスワード生成
  const generatePassword = (str: string, num: number) => {
    const result = [...Array(num)]
      .map(() => str[Math.floor(Math.random() * str.length)])
      .join('');

    setDisplay('block');

    return result;
  };

  // Submit時
  const onSubmit = handleSubmit(data => {
    const _lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const _uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const _number = '0123456789';

    switch (data.customRadio) {
      case '1':
        while (1) {
          const p = generatePassword(
            _lowercase + _uppercase + _number,
            data.su
          );
          if (p.match(/[a-z]/) && p.match(/[A-Z]/) && p.match(/[0-9]/)) {
            setPassword(p);
            break;
          }
        }
        break;

      case '2':
        while (1) {
          const p = generatePassword(_lowercase + _uppercase, data.su);
          if (p.match(/[a-z]/) && p.match(/[A-Z]/)) {
            setPassword(p);
            break;
          }
        }

        break;
      case '3':
        while (1) {
          const p = generatePassword(_lowercase + _number, data.su);
          if (p.match(/[a-z]/) && p.match(/[0-9]/)) {
            setPassword(p);
            break;
          }
        }

        break;
      case '4':
        setPassword(generatePassword(_lowercase, data.su));
        break;
      case '5':
        setPassword(generatePassword(_uppercase, data.su));
        break;
      case '6':
        setPassword(generatePassword(_number, data.su));
        break;
      default:
    }
  });

  return (
    <>
      <h1>パスワード生成サイト | ラインオープンチャット</h1>

      <div style={{ display: display }}>
        <div style={{ fontSize: 22 }}>{password}</div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            copy(password);
            alert('パスワードをコピーしました');
          }}
        >
          コピーする
        </button>
      </div>

      <hr />

      <form onSubmit={onSubmit}>
        <div style={{ color: 'tomato' }}>{errors.su?.message}</div>
        <div>桁数(8～100)</div>
        <input
          type="number"
          name="su"
          max="100"
          min="8"
          ref={register({
            valueAsNumber: true,
            required: '必須項目です',
            pattern: {
              value: /^[0-9]+$/,
              message: '整数で入力してください',
            },
            min: {
              value: 8,
              message: '8以上の数字を入力してください',
            },
            max: {
              value: 100,
              message: '100以下の数字を入力してください',
            },
          })}
        />

        <hr />

        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio7"
            name="customRadio"
            className="custom-control-input"
            value="1"
            defaultChecked
            ref={register({ required: true })}
          />
          <label className="custom-control-label" htmlFor="customRadio7">
            英小文字・英大文字・数値
          </label>
        </div>

        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio1"
            name="customRadio"
            className="custom-control-input"
            value="2"
            ref={register({ required: true })}
          />
          <label className="custom-control-label" htmlFor="customRadio1">
            英小文字・英大文字
          </label>
        </div>

        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio2"
            name="customRadio"
            className="custom-control-input"
            value="3"
            ref={register({ required: true })}
          />
          <label className="custom-control-label" htmlFor="customRadio2">
            英小文字・数値
          </label>
        </div>

        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio3"
            name="customRadio"
            className="custom-control-input"
            value="4"
            ref={register({ required: true })}
          />
          <label className="custom-control-label" htmlFor="customRadio3">
            英小文字のみ
          </label>
        </div>

        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio4"
            name="customRadio"
            className="custom-control-input"
            value="5"
            ref={register({ required: true })}
          />
          <label className="custom-control-label" htmlFor="customRadio4">
            英大文字のみ
          </label>
        </div>

        <div className="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio5"
            name="customRadio"
            className="custom-control-input"
            value="6"
            ref={register({ required: true })}
          />
          <label className="custom-control-label" htmlFor="customRadio5">
            数値のみ
          </label>
        </div>

        <hr />

        <input
          type="submit"
          value="パスワード生成"
          className="btn btn-primary"
        />
      </form>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
