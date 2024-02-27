import Modal from 'flarum/common/components/Modal';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';

export default class SendToLinearModal extends Modal {
  static isDismissibleViaCloseButton = true;
  static isDismissibleViaEscKey = true;
  static isDismissibleViaBackdropClick = true;

  teams = [];
  priorities = [];
  defaultTeam = '';
  selectedTeam = '';
  selectedPriority = 0;
  tags = [];

  loadData(): void {
    m.request({
      method: 'GET',
      url: '/api/linear/teams',
    }).then((response) => {
      this.teams = response.data.attributes;
    });

    m.request({
      method: 'GET',
      url: '/api/linear/priorities',
    }).then((response) => {
      this.priorities = response.data.attributes;
    });
  }

  className() {
    // Custom CSS classes to apply to the modal
    return 'custom-modal-class';
  }

  title() {
    // Title of the modal.
    return app.translator.trans('blomstra-linear.forum.modals.title');
  }

  content() {
    if (this.teams.length > 0 && this.priorities.length > 0 && this.selectedTeam !== '') {
      return (
        <>
          <div class="Modal-body">
            <div class="Form">
              <div class="Form-group">
                <label>{app.translator.trans('blomstra-linear.forum.modals.fields.team')}</label>
                <span class="Select">
                  <select
                    value={this.selectedTeam}
                    class="Select-input FormControl"
                    onchange={(e) => {
                      this.selectedTeam = e.target.value;
                    }}
                  >
                    {this.teams.map((team) => {
                      return <option value={team.id}>{team.name}</option>;
                    })}
                  </select>
                </span>
              </div>
              <div class="Form-group">
                <label>{app.translator.trans('blomstra-linear.forum.modals.fields.priority')}</label>
                <span class="Select">
                  <select
                    class="Select-input FormControl"
                    value={this.selectedPriority}
                    onchange={(e) => {
                      this.selectedPriority = e.target.value;
                    }}
                  >
                    {this.priorities.map((priority) => {
                      return <option value={priority.priority}>{priority.label}</option>;
                    })}
                  </select>
                </span>
              </div>
              <div class="Form-group">
                <Button className="Button Button--primary" type="submit">
                  <i id="linear-submission-loading" class="fa fa-spinner fa-spin visually-hidden" aria-hidden="true"></i>
                  {app.translator.trans('blomstra-linear.forum.controls.send_to_linear_button')}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div class="Modal-body">
            <p class="center">
              <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
              {app.translator.trans('blomstra-linear.forum.modals.loading')}
            </p>
          </div>
        </>
      );
    }
  }

  onsubmit(e) {
    e.preventDefault();
    // If your modal contains a form, you can add form processing logic here.
    // Show the icon in the submit button
    document.getElementById('linear-submission-loading').classList.remove('visually-hidden');

    m.request({
      method: 'POST',
      url: '/api/linear/issues',
      headers: {
        'X-CSRF-Token': app.session.csrfToken,
      },
      body: {
        team: this.selectedTeam,
        priority: this.selectedPriority,
        tags: this.tags,
        discussion: this.attrs.discussion.id(),
      },
    }).then((response) => {
      app.forum.pushAttributes({
        blomstraLinearLastPriority: this.selectedPriority,
        blomstraLinearLastTeamId: this.selectedTeam,
      });

      if (response.data.id !== undefined || response.data.id !== null) {
        this.attrs.linear = response.data.id;
        app.current.data.discussion.data.attributes.linearIssueId = response.data.id;
        document.getElementById('linear-submission-loading').classList.add('visually-hidden');
        m.redraw();
        this.hide();
      } else {
        alert('Something went wrong, please try again.');
      }
    });
  }

  oninit(vnode) {
    super.oninit(vnode);
    this.loadData();

    this.defaultTeam = app.forum.attribute('blomstraLinearDefaultTeamId');
    const lastSelectedTeam = app.forum.attribute('blomstraLinearLastTeamId');

    this.selectedTeam = this.defaultTeam ?? lastSelectedTeam;

    this.selectedPriority = app.forum.attribute('blomstraLinearLastPriority') ?? 0;
  }
}
