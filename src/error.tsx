import { Link, useRouteError } from 'react-router';

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Ops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Ocorreu um erro na aplicação. Abaixo, você encontra mais detalhes:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        {' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Voltar para o dashboard
        </Link>
      </p>
    </div>
  );
}
