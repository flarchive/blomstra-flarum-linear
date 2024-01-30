import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionPage from "flarum/forum/components/DiscussionPage";
import Discussion from "flarum/common/models/Discussion";
import LinkButton from "flarum/common/components/LinkButton";
import Button from "flarum/common/components/Button";
import SendToLinearModal from "./components/SendToLinearModal";

app.initializers.add('blomstra/linear', () => {
  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    const discussion  = this.discussion;

    let linear = discussion.attribute('linearIssueId');

    let lx = linear !== null ? linear.split(':::') : 'a:::b';
    let lOrg = lx[0];
    let lId = lx[1];

    const canAddToLinear = discussion.attribute('canAddToLinear');
    if (!canAddToLinear) {
      return;
    }

    items.add(
      'blomstra-linear',
      linear === null ?
        (
          <Button icon="fa fa-paper-plane" class="Button" onclick={() => app.modal.show(SendToLinearModal, { discussion })}>
            {app.translator.trans('blomstra-linear.forum.controls.send_to_linear_button')}
          </Button>
        ) : (
          <LinkButton
            icon="fa fa-paper-plane"
            class="Button"
            href={"https://linear.app/" + lOrg + "/issue/" + lId}
            external={true}
            target="_blank">
            Open in Linear
          </LinkButton>
  ), 100
  )

  });


});
