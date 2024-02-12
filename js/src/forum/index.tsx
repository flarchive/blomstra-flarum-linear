import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Discussion from 'flarum/common/models/Discussion';
import LinkButton from 'flarum/common/components/LinkButton';
import Button from 'flarum/common/components/Button';
import SendToLinearModal from './components/SendToLinearModal';
import Badge from 'flarum/common/components/Badge';

app.initializers.add('blomstra/linear', () => {
  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    const discussion: Discussion = this.discussion;
    let linear = null;
    linear = discussion.attribute('linearIssueId');
    let lx = linear !== null ? linear.split(':::') : 'a:::b';
    let lOrg = lx[0];
    let lId = lx[1];

    const canAddToLinear = discussion.attribute('canAddToLinear');
    if (!canAddToLinear) {
      return;
    }

    items.add(
      'blomstra-linear',
      linear === null ? (
        <Button icon="far fa-paper-plane" class="Button" onclick={() => app.modal.show(SendToLinearModal, { discussion })}>
          {app.translator.trans('blomstra-linear.forum.controls.send_to_linear_button')}
        </Button>
      ) : (
        <LinkButton icon="far fa-paper-plane" class="Button" href={'https://linear.app/' + lOrg + '/issue/' + lId} external={true} target="_blank">
          {app.translator.trans('blomstra-linear.forum.controls.open_in_linear_button')}
        </LinkButton>
      ),
      100
    );
  });

  extend(Discussion.prototype, 'badges', function (badges) {
    let linear = null;
    linear = this.attribute('linearIssueId');
    let lx = linear !== null ? linear.split(':::') : 'a:::b';
    let lOrg = lx[0];
    let lId = lx[1];
    const canAddToLinear = this.attribute('canAddToLinear');

    if (canAddToLinear && linear !== null) {
      badges.add(
        'linear',
        <Badge type="linear" icon="far fa-paper-plane" label={app.translator.trans('blomstra-linear.forum.badges.linear.tooltip')} />,
        10
      );
    }
  });
});
