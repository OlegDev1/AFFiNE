import {
  MenuItem,
  MenuTrigger,
  RadioGroup,
  type RadioItem,
} from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { DocModesEnum } from '@blocksuite/affine/blocks';
import { useFramework, useLiveData } from '@toeverything/infra';
import { useMemo, useState } from 'react';

import { settingWrapper } from '../style.css';

export const LinkedDoc = () => {
  const t = useI18n();
  const framework = useFramework();
  const { editorSetting } = framework.get(EditorSettingService);
  const settings = useLiveData(editorSetting.settings$);
  const [currentDocMode, setCurrentDocMode] = useState<DocModesEnum>(
    DocModesEnum.Edgeless
  );

  const docModeItems = useMemo<RadioItem[]>(
    () => [
      {
        value: DocModesEnum.Edgeless,
        label:
          t[
            'com.affine.settings.editorSettings.edgeless.linked-doc.doc-mode.edgeless'
          ](),
      },
      {
        value: DocModesEnum.Page,
        label:
          t[
            'com.affine.settings.editorSettings.edgeless.linked-doc.doc-mode.page'
          ](),
      },
    ],
    [t]
  );

  const { view } = settings['affine:embed-linked-doc'][currentDocMode];

  return (
    <>
      <SettingRow
        name={t[
          'com.affine.settings.editorSettings.edgeless.linked-doc.doc-mode'
        ]()}
        desc={''}
      >
        <RadioGroup
          items={docModeItems}
          value={currentDocMode}
          width={250}
          className={settingWrapper}
          onChange={setCurrentDocMode}
        />
      </SettingRow>
      <SettingRow
        name={t[
          'com.affine.settings.editorSettings.edgeless.linked-doc.view'
        ]()}
        desc={''}
      ></SettingRow>
    </>
  );
};
