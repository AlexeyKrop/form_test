import React, { FC, useState } from 'react';

import { Button } from 'components/Form/Button/Button';
import { Form } from 'components/Form/Form';

const App: FC = () => {
  console.log('App render');
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [errorField, setError] = useState(false);

  const isDisabledBtn: (value: boolean, error: string) => void = (value, error) => {
    setError(!error);
    setDisabled(value);
  };

  return (
    <Form isDisabledBtn={isDisabledBtn}>
      <Button disabled={isDisabled}>
        <span>Submit</span>
      </Button>
    </Form>
  );
};

export default App;
