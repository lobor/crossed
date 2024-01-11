'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="P"
      description={t('The P represents a paragraph.')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`// coming soon`}
    />
  );
}
