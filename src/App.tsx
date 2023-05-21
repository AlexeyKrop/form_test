import React, { FC, useCallback, useState } from 'react';

import { Button } from 'components/Form/Button/Button';
import { Form } from 'components/Form/Form';

const App: FC = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [errorField, setError] = useState(false);

  const isDisabledBtn = useCallback((value: boolean, error: string) => {
    setError(!!error);
    setDisabled(value);
  }, []);

  return (
    <Form isDisabledBtn={isDisabledBtn}>
      <Button disabled={isDisabled || errorField}>
        <span>Submit</span>
      </Button>
    </Form>
  );
};

export default App;
