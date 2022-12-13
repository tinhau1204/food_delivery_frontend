import PasswordRequirement from "../PasswordRequirement";
import { PasswordInput } from "@mantine/core";
import requirements from "./requirements";
import { HiLockClosed } from "react-icons/hi";
import { Popover, Progress } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const PasswordStrength = ({ value, onChange, error }) => {
  const [popoverOpened, popoverHandlers] = useDisclosure(false);

  const handleOnFocus = () => {
    popoverHandlers.open();
  };

  const handleOnBlur = () => {
    popoverHandlers.close();
  };

  const getStrength = (password, requirements) => {
    let multiplier = 0;

    requirements.forEach((requirement) => {
      if (!requirement.regex.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  };

  const strength = getStrength(value, requirements);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <>
      <Popover
        opened={popoverOpened}
        position="left"
        placement="start"
        width="target"
        trapFocus={false}
        transition="pop-top-left"
        withArrow
      >
        <Popover.Target>
          <div onFocusCapture={handleOnFocus} onBlurCapture={handleOnBlur}>
            <PasswordInput
              label="Password"
              size="md"
              icon={<HiLockClosed />}
              placeholder="Password"
              value={value}
              onChange={onChange}
              error={error}
              required
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb={10} />
          {requirements.map((requirement, index) => (
            <PasswordRequirement
              key={index}
              label={requirement.label}
              meets={requirement.regex.test(value)}
            />
          ))}
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default PasswordStrength;
