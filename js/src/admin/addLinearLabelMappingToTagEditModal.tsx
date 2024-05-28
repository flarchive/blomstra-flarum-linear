import app from 'flarum/admin/app';
import EditTagModal  from 'flarum/tags/admin/components/EditTagModal';
import {extend} from "flarum/common/extend";
import SelectDropdown from 'flarum/common/components/SelectDropdown';
import Stream from 'flarum/common/utils/Stream';
import Button from 'flarum/common/components/Button';

type LinearLabel = {
    id: string
    name: string
    isGroup: boolean
}

export function addLinearLabelMappingToTagEditModal () {
    let labels: LinearLabel[] = []

    m.request({
        method: "GET",
        url: "/api/linear/labels",
    }).then((response) => {
        labels = response.data.attributes
        console.error(response.data)
    })

    extend(EditTagModal.prototype, 'oninit', function () {
      this.linearLabelId = this.tag.data.attributes?.linearLabelId
    })

    extend(EditTagModal.prototype, 'fields', function (items) {
        const LinearLabelOptions = [
            {
                value: null,
                text: app.translator.trans(`blomstra-linear.admin.tags.fields.linear_label_id.default_select_value`),
            },
            ...labels.map((label) => ({
                value: label.id,
                text: label.name,
            }))
        ]

        const makeLinearLabelSelect = () => ((
            <SelectDropdown
                className="Dropdown--linear-labels"
                buttonClassName="Button Button--inverted"
                defaultLabel={app.translator.trans(`blomstra-linear.admin.tags.fields.linear_label_id.default_select_value`)}
            >
                {LinearLabelOptions.map(option => (
                    <Button
                        className="Button"
                        value={option.value}
                        active={this.linearLabelId === option.value}
                        type="button"
                        onclick={() => {
                            this.linearLabelId = option.value
                        }}
                    >
                        {option.text}
                    </Button>
                ))}
            </SelectDropdown>
        ));

        items.add(
            'linearLabelId',
            <div className="Form-group">
                <label>{app.translator.trans(`blomstra-linear.admin.tags.fields.linear_label_id.label`)}</label>
                {makeLinearLabelSelect()}
            </div>,
            30,
        );
    })

    extend(EditTagModal.prototype, 'submitData', function (data) {
        data.linearLabelId = this.linearLabelId

        return data
    })
}
