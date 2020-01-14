import { NodeModel, PortModel } from 'storm-react-diagrams';
import { FlowNodePortModel } from './FlowNodePortModel';
import { FlowNodeConfig } from './FlowNodeConfig';
import { FlowNodeEventHandlers } from './EventHandlers';
import { Translate, translate } from 'react-jhipster';

export class FlowNodeModel extends NodeModel {
  static TYPE: string = 'default';

  constructor(nodeType: string = FlowNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id);
    this._label = label;
  }

  private _offsetX: number = -1;
  private _offsetY: number = -1;

  get offsetX(): number {
    return this._offsetX;
  }

  set offsetX(value: number) {
    this._offsetX = value;
  }

  get offsetY(): number {
    return this._offsetY;
  }

  set offsetY(value: number) {
    this._offsetY = value;
  }

  private _config: FlowNodeConfig;

  get config(): FlowNodeConfig {
    return this._config;
  }

  set config(value: FlowNodeConfig) {
    this._config = value;
  }

  private _dropZoneVisible: boolean = false;

  get dropZoneVisible(): boolean {
    return this._dropZoneVisible;
  }

  set dropZoneVisible(value: boolean) {
    this._dropZoneVisible = value;
  }

  private _eventHandlers: FlowNodeEventHandlers = null;

  get eventHandlers(): FlowNodeEventHandlers {
    return this._eventHandlers;
  }

  set eventHandlers(value: FlowNodeEventHandlers) {
    this._eventHandlers = value;
  }

  private _label: string;

  get label(): string {
    if (this._label && this._label !== '') return this._label;
    else return this.getDefaultLabel();
  }

  set label(value: string) {
    this._label = value;
  }

  getDefaultLabel(): string {
    return '';
  }

  getDefaultInPort(): PortModel | null {
    return null;
  }

  getDefaultOutPort(): PortModel | null {
    return null;
  }

  getInPort(pos?: string): PortModel | null {
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    return null;
  }

  getInPortOrDefault(pos?: string): PortModel | null {
    let port = this.getInPort(pos);
    if (port) return port;
    return this.getDefaultInPort();
  }

  getOutPortOrDefault(pos?: string): PortModel | null {
    let port = this.getOutPort(pos);
    if (port) return port;
    return this.getDefaultOutPort();
  }

  getInPorts(): { [s: string]: PortModel } {
    return null;
  }

  getOutPorts(): { [s: string]: PortModel } {
    return null;
  }
}

export class DecisionNodeModel extends FlowNodeModel {
  static TYPE: string = 'decision';
  static WIDTH: number = 90;
  static HEIGHT: number = 90;
  constructor(nodeType: string = DecisionNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.OUT, translate('diagram.condition_result.nok'))); //out
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT, translate('diagram.condition_result.ok'))); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.decision');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.RIGHT || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);
    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class MergeNodeModel extends FlowNodeModel {
  static TYPE: string = 'merge';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(nodeType: string = MergeNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.merge');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.LEFT || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);
    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class ForkNodeModel extends FlowNodeModel {
  static TYPE: string = 'fork';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(nodeType: string = ForkNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.TOP, FlowNodePortModel.OUT)); //out
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.fork');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.TOP);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.TOP || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);

    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.TOP] = this.getPort(FlowNodePortModel.TOP);
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);
    return ports;
  }
}

export class JoinNodeModel extends FlowNodeModel {
  static TYPE: string = 'join';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(nodeType: string = JoinNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.TOP, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.join');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.TOP);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.TOP || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.TOP] = this.getPort(FlowNodePortModel.TOP);
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);

    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class ProcessNodeModel extends FlowNodeModel {
  static TYPE: string = 'process';
  static WIDTH: number = 64;
  static HEIGHT: number = 64;

  constructor(nodeType: string = ProcessNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.process');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);

    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class StartNodeModel extends FlowNodeModel {
  static TYPE: string = 'start';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(nodeType: string = StartNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.start');
  }

  getDefaultInPort(): PortModel | null {
    return null;
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    return {};
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class EndNodeModel extends FlowNodeModel {
  static TYPE: string = 'end';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(id?: string, label?: string) {
    super(EndNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
  }

  getDefaultLabel(): string {
    return translate('diagram.node.end');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return null;
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);
    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    return {};
  }
}

export class ContactSourceStartNodeModel extends StartNodeModel {
  static TYPE: string = 'start_contact_source';

  constructor(id?: string, label?: string) {
    super(ContactSourceStartNodeModel.TYPE, id, label);
  }

  getDefaultLabel(): string {
    return translate('diagram.node.start_contact_source');
  }
}

export class EventSourceStartNodeModel extends StartNodeModel {
  static TYPE: string = 'start_event_source';

  constructor(id?: string, label?: string) {
    super(EventSourceStartNodeModel.TYPE, id, label);
  }

  getDefaultLabel(): string {
    return translate('diagram.node.start_event_source');
  }
}

export class EmailProcessNodeModel extends ProcessNodeModel {
  static TYPE: string = 'process_email';

  constructor(id?: string, label?: string) {
    super(EmailProcessNodeModel.TYPE, id, label);
  }

  getDefaultLabel(): string {
    return translate('diagram.node.process_email');
  }
}

export class SmsProcessNodeModel extends ProcessNodeModel {
  static TYPE: string = 'process_sms';

  constructor(id?: string, label?: string) {
    super(SmsProcessNodeModel.TYPE, id, label);
  }

  getDefaultLabel(): string {
    return translate('diagram.node.process_sms');
  }
}

export class TimeWaitingDecisionNodeModel extends ProcessNodeModel {
  static TYPE: string = 'decision_time_waiting';

  constructor(id?: string, label?: string) {
    super(TimeWaitingDecisionNodeModel.TYPE, id, label);
  }

  getDefaultLabel(): string {
    return translate('diagram.node.decision_time_waiting');
  }
}

export class EventWaitingDecisionNodeModel extends DecisionNodeModel {
  static TYPE: string = 'decision_event_waiting';

  constructor(id?: string, label?: string) {
    super(EventWaitingDecisionNodeModel.TYPE, id, label);
  }

  getDefaultLabel(): string {
    return translate('diagram.node.decision_event_waiting');
  }
}

export class ConditionDecisionNodeModel extends DecisionNodeModel {
  static TYPE: string = 'decision_condition';

  constructor(id?: string, label?: string) {
    super(ConditionDecisionNodeModel.TYPE, id, label);
  }

  getDefaultLabel(): string {
    return translate('diagram.node.decision_condition');
  }
}
