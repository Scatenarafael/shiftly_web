import { toast } from 'sonner';

export type ToastCallbackProps = {
  status: 'success' | 'failure';
  msg?: string;
};

export function toastCallback({ status, msg }: ToastCallbackProps) {
  if (status === 'success') {
    toast.success(msg);
  } else {
    toast.error(msg);
  }
}

export function phoneMask(arg: string) {
  let r = arg.replace(/\D/g, '');
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    // 11+ digits. Format as 5+4.
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1)$2-$3');
  } else if (r.length > 5) {
    // 6..10 digits. Format as 4+4
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1)$2-$3');
  } else if (r.length > 2) {
    // 3..5 digits. Add (..)
    r = r.replace(/^(\d\d)(\d{0,5})/, '($1)$2');
  } else {
    // 0..2 digits. Just add (
    r = r.replace(/^(\d*)/, '($1');
  }
  return r;
}

export function ipMask(input: string) {
  // Allow only digits and dots, remove anything else
  let value = input.replace(/[^\d.]/g, '');

  // Split into parts and ensure we don't exceed 4 octets
  const parts = value.split('.');
  if (parts.length > 4) {
    parts.length = 4; // Truncate to max 4 octets
    value = parts.join('.');
  }

  // Process each octet
  const processedParts = parts.map((part) => {
    let localPart = part;
    // Remove leading zeros (but allow single zero)
    if (part.length > 1) localPart = part.replace(/^0+/, '') || '0';

    // Limit to 3 digits max per octet
    if (part.length > 3) localPart = part.slice(0, 3);

    return localPart;
  });

  // Rebuild the IP string
  let result = processedParts.join('.');

  // Auto-insert dots only when necessary (not during backspace)
  const isAdding = input.length > (value.length || 0);

  if (isAdding) {
    // Auto-advance after 3 digits in an octet
    for (let i = 0; i < processedParts.length; i++) {
      if (processedParts[i].length === 3 && i < 3) {
        // Ensure we don't add duplicate dots
        if (result.split('.').length <= i + 1) {
          result = `${processedParts.slice(0, i + 1).join('.')}.`;
        }
        break;
      }
    }
  }

  return result;
}

export function capitalizeString(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export type CategoryParameterItem = {
  id: number;
  type: {
    id: number;
    name: string;
  };
  name: string;
  description: string;
  rtu_action: 'send' | 'receive' | 'send and receive';
  parameter_category: number;
};

export type ModuleCategoryItem = {
  id: number;
  category_parameters: CategoryParameterItem[];
  name: string;
  module: number;
};

export type ParameterModuleItemProps = {
  id: number;
  module_categories: ModuleCategoryItem[];
  name: string;
};

export const parameterTypes: { id: number; name: string }[] = [
  {
    id: 1,
    name: 'current',
  },
  {
    id: 2,
    name: 'temperature',
  },
  {
    id: 3,
    name: 'alarm',
  },
  {
    id: 4,
    name: 'threshold',
  },
];

export const parameterCategories: { id: number; name: string }[] = [
  {
    id: 1,
    name: 'Current',
  },
  {
    id: 2,
    name: 'Case',
  },
  {
    id: 3,
    name: 'Chip',
  },
];

export const parameterModules: ParameterModuleItemProps[] = [
  {
    id: 1,
    module_categories: [
      {
        id: 3,
        category_parameters: [
          {
            id: 34,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pulse_width',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 3,
          },
          {
            id: 33,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pulse_trigger_delay',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 3,
          },
          {
            id: 32,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pulse_period',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 3,
          },
          {
            id: 4,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'alarm_second_interval',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 3,
          },
          {
            id: 3,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'alarm_channel_range',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 3,
          },
          {
            id: 2,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'acq_frames_per_file',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 3,
          },
          {
            id: 1,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'acq_channels',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 3,
          },
        ],
        name: 'Current',
        module: 1,
      },
      {
        id: 2,
        category_parameters: [],
        name: 'Case',
        module: 1,
      },
      {
        id: 1,
        category_parameters: [],
        name: 'Chip',
        module: 1,
      },
    ],
    name: 'OPTICA',
  },
  {
    id: 2,
    module_categories: [
      {
        id: 6,
        category_parameters: [
          {
            id: 31,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'pulsed_edfa_current_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 6,
          },
          {
            id: 30,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'pulsed_edfa_current_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 6,
          },
          {
            id: 29,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pulsed_edfa_current',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 6,
          },
        ],
        name: 'Current',
        module: 2,
      },
      {
        id: 5,
        category_parameters: [
          {
            id: 25,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'pulsed_edfa_case_temp_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 5,
          },
          {
            id: 24,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'pulsed_edfa_case_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 5,
          },
          {
            id: 23,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pulsed_edfa_case_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 5,
          },
        ],
        name: 'Case',
        module: 2,
      },
      {
        id: 4,
        category_parameters: [
          {
            id: 28,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'pulsed_edfa_chip_temp_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 4,
          },
          {
            id: 27,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'pulsed_edfa_chip_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 4,
          },
          {
            id: 26,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pulsed_edfa_chip_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 4,
          },
        ],
        name: 'Chip',
        module: 2,
      },
    ],
    name: 'Pulsed EDFA',
  },
  {
    id: 3,
    module_categories: [
      {
        id: 9,
        category_parameters: [
          {
            id: 22,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'pin_edfa_current_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 9,
          },
          {
            id: 21,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'pin_edfa_current_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 9,
          },
          {
            id: 20,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pin_edfa_current',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 9,
          },
        ],
        name: 'Current',
        module: 3,
      },
      {
        id: 8,
        category_parameters: [
          {
            id: 16,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'pin_edfa_case_temp_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 8,
          },
          {
            id: 15,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'pin_edfa_case_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 8,
          },
          {
            id: 14,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pin_edfa_case_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 8,
          },
        ],
        name: 'Case',
        module: 3,
      },
      {
        id: 7,
        category_parameters: [
          {
            id: 19,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'pin_edfa_chip_temp_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 7,
          },
          {
            id: 18,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'pin_edfa_chip_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 7,
          },
          {
            id: 17,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'pin_edfa_chip_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 7,
          },
        ],
        name: 'Chip',
        module: 3,
      },
    ],
    name: 'Pin EDFA',
  },
  {
    id: 4,
    module_categories: [
      {
        id: 12,
        category_parameters: [
          {
            id: 13,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'laser_current_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 12,
          },
          {
            id: 12,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'laser_current_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 12,
          },
          {
            id: 11,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'laser_current',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 12,
          },
        ],
        name: 'Current',
        module: 4,
      },
      {
        id: 11,
        category_parameters: [
          {
            id: 7,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'laser_case_temp_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 11,
          },
          {
            id: 6,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'laser_case_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 11,
          },
          {
            id: 5,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'laser_case_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 11,
          },
        ],
        name: 'Case',
        module: 4,
      },
      {
        id: 10,
        category_parameters: [
          {
            id: 10,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'laser_chip_temp_alarm_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 10,
          },
          {
            id: 9,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'laser_chip_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 10,
          },
          {
            id: 8,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'laser_chip_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 10,
          },
        ],
        name: 'Chip',
        module: 4,
      },
    ],
    name: 'Laser',
  },
  {
    id: 5,
    module_categories: [
      {
        id: 15,
        category_parameters: [
          {
            id: 49,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'ran_current2_thresh',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 15,
          },
          {
            id: 48,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'ran_current2',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 15,
          },
          {
            id: 47,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'ran_current1_thresh',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 15,
          },
          {
            id: 46,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'ran_current1',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 15,
          },
        ],
        name: 'Current',
        module: 5,
      },
      {
        id: 14,
        category_parameters: [
          {
            id: 37,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'ran_case_temp_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 14,
          },
          {
            id: 36,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'ran_case_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 14,
          },
          {
            id: 35,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'ran_case_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 14,
          },
        ],
        name: 'Case',
        module: 5,
      },
      {
        id: 13,
        category_parameters: [
          {
            id: 45,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'ran_chip2_temp_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
          {
            id: 44,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'ran_chip2_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
          {
            id: 43,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'ran_chip2_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
          {
            id: 42,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'ran_chip2_current_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
          {
            id: 41,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'ran_chip1_temp_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
          {
            id: 40,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'ran_chip1_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
          {
            id: 39,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'ran_chip1_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
          {
            id: 38,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'ran_chip1_current_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 13,
          },
        ],
        name: 'Chip',
        module: 5,
      },
    ],
    name: 'Raman',
  },
  {
    id: 6,
    module_categories: [
      {
        id: 18,
        category_parameters: [
          {
            id: 53,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'rmu_polling_period',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 18,
          },
        ],
        name: 'Current',
        module: 6,
      },
      {
        id: 17,
        category_parameters: [
          {
            id: 52,
            type: {
              id: 4,
              name: 'threshold',
            },
            name: 'rmu_case_temp_threshold',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 17,
          },
          {
            id: 51,
            type: {
              id: 3,
              name: 'alarm',
            },
            name: 'rmu_case_temp_alarm',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 17,
          },
          {
            id: 50,
            type: {
              id: 1,
              name: 'current',
            },
            name: 'rmu_case_temp',
            description: 'Description',
            rtu_action: 'send',
            parameter_category: 17,
          },
        ],
        name: 'Case',
        module: 6,
      },
      {
        id: 16,
        category_parameters: [],
        name: 'Chip',
        module: 6,
      },
    ],
    name: 'RMU',
  },
];
