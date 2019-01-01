import { storiesOf } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { HeaderComponent } from "../src/app/core/components/header/header.component";

storiesOf("Core", module).add("Header menu component", () => ({
  component: HeaderComponent,
}));
