'use client';

import { Container } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import ServiceNewEditForm from '../service-new-edit-form';

export default function ServiceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new service"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Services', href: paths.dashboard.service.list },
          { name: 'New Service' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ServiceNewEditForm />
    </Container>
  );
} 