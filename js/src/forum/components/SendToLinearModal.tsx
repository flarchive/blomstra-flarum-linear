import Modal, {IInternalModalAttrs} from 'flarum/common/components/Modal';
import app from "flarum/forum/app";
import Button from "flarum/common/components/Button";
import Model from 'flarum/common/Model';
import DiscussionPage from "flarum/forum/components/DiscussionPage";
import Discussion from "flarum/common/models/Discussion";

export default class SendToLinearModal extends Modal {
  // True by default, dictates whether the modal can be dismissed by clicking on the background or in the top right corner.
  static isDismissible = true;

  teams = [];
  priorities = [];
  defaultTeam = '';
  ready = false;
  selectedTeam = '';
  selectedPriority = 0;
  discussion = '';
  tags = [];

  getTags(): void {
    let tags = this.attrs.discussion !== '' ? this.attrs.discussion.tags() : [];
    tags.map((tag) => {
      this.tags.push(tag.data.id)
    });
  }

  loadData(): void {

    this.getTags();
    m.request(
      {
        method: "GET",
        url: "/api/linear/teams",
      }
    ).then((response) => {
      this.teams = response.data.attributes;
    });

    m.request(
      {
        method: "GET",
        url: "/api/linear/priorities",
      }
    ).then((response) => {
      this.priorities = response.data.attributes;
    });

    this.selectedTeam = this.defaultTeam;
    this.selectedPriority = 0;

  }

  className() {
    // Custom CSS classes to apply to the modal
    return 'custom-modal-class';
  }

  title() {
    // Title of the modal.
    return 'Send to Linear';
  }

  content() {
    if (this.teams.length > 0 && this.priorities.length > 0 && this.selectedTeam !== '') {
    return <>
      <div class="Modal-body">
        <div class="Form">
          <div class="Form-group">
            <label>Team</label>
            <span class="Select">
              <select
                value={this.selectedTeam}
                class="Select-input FormControl"
                onchange={(e) => {
                  this.selectedTeam = e.target.value;}
                }
              >
                {this.teams.map((team) => {
                  return <option
                    value={team.id}
                  >{team.name}
                  </option>
                })}
              </select>
            </span>
          </div>
          <div class="Form-group">
            <label>Priority</label>
            <span class="Select">
              <select
                class="Select-input FormControl"
                value={this.selectedPriority}
                onchange={(e) => {
                  this.selectedPriority = e.target.value;
                }
                }
              >
                {this.priorities.map((priority) => {
                  return <option
                    value={priority.priority}
                  >
                    {priority.label}
                  </option>
                })}
              </select>
            </span>
          </div>
          <div class="Form-group">
            <Button className="Button Button--primary" type="submit">
              <i id="linear-submission-loading" class="fa fa-spinner fa-spin visually-hidden" aria-hidden="true"></i> Send to Linear
            </Button>
          </div>
        </div>
      </div>
    </>
    } else {
      return <>
        <div class="Modal-body">
          <p class="center"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Loading...</p>
        </div>
      </>
    }
    // Content to show in the modal's body

  }

  onsubmit(e) {
    e.preventDefault();
    // If your modal contains a form, you can add form processing logic here.
    // Show the icon in the submit button
    document.getElementById('linear-submission-loading').classList.remove('visually-hidden');
    m.request(
      {
        method: "POST",
        url: "/api/linear/issues",
        headers: {
          'X-CSRF-Token': app.session.csrfToken,
        },
        body: {
          team: this.selectedTeam,
          priority: this.selectedPriority,
          tags: this.tags,
          discussion: this.attrs.discussion.id(),
        }
      }
    ).then((response) => {
      //console.log(response);
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
    this.selectedTeam = this.defaultTeam;
  }

}
