export interface IListCloneVersion {
  id: string;
  cjId: string;
  version: string;
  name: string;
  cjTags: [];
  status: string;
  flow: string;
  description: string;
  nodeMetaData: string;
  countAct: string;
  flowDetail: {
    customerGroupName: string;
    startTime: string;
    customerAdvancedSave: {
      advancedSearches: [{}];
      logicalOperator: string;
    };
    nodeMetaData: [
      {
        nodeId: string;
        code: string;
        nodeConfig: any;
      }
    ];
    graph: {
      nodes: [
        {
          type: string;
          label: string;
          code: string;
          value: string;
          id: string;
          emailConfig: string;
          smsConfig: string;
          countAct: string;
          x: number;
          y: number;
        }
      ];
      edges: [
        {
          source: string;
          sourceAnchor: string;
          target: string;
          targetAnchor: string;
          id: string;
          value: string;
        }
      ];
    };
  };
}

export const img_node = {
  SOURCE:
    'data:image/png;base64,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',
  EVENT:
    'data:image/png;base64,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',
  END:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO1SURBVHgB1ZlNaBNBFMf/swkqtUgQ1B56iHgTSlMQtVTpFBT6cbFH20MawZMH21s9NT2Jp1bw5sF68eDFglBbFLriR1svTRF68iMHDxZBqtRSIc343jRN89VkdzbZxh9sdrKZZf+ZffPmzXsCHpFX30UQVBIi0AqICJQKQSCc7SDUOtIiQY11IPUaKWHbLzsS8ICAAbJ7IQwLURI0DCVCcE+SDhtpjNuz7Um4xJVoLVbgER0S1WPKrXhHoqVcDqFh6zY146gdcXumfdxJx4qiM6YwT80wak+SRr2r0qhb5X6U3W8kAmoZ/giGfo4llmXP+2vlOu0rWvYtRWEF5w0nmgfY+4hnspuevw8lzUP/U7oRB006RaZy2S68XCRa2zCbhO8jXAry7WnVVmjjxebBk64uBDNkKqRHe68c8kTL3qUx+DfpnBJGw+Zw7oWseWRc21fUK2mc3jWTvZG2MIZ6hlfibBPmo/z86Tk0Hg26uqerbxHGZEZ7Z6QNR9mtYM9Y6SE+7T5VwgOzr35g5eNv1J6Ajn+CsvdDBNgOwwMJEjxHwp3Ab6exMYDva3/hHhXi+N2CSkn4RNOpw3j4oAUTd8/qthFBIS0IqxM+cetmGE0nD2vBxsKFaLX09sgn7k18xqcvm7ptLFwpMg9LReATG39SGBld9SZciFCwWnFGa8sxDA02wy27wkfurDqdnOGqOVp+eISEm97Lwq/fWHbU30Kd8PjJN8d9eaSTqEJkN+digYkONKP7yonsd56gsw79PMfYQZ1MUUbpjyKc2GR00ItgsPdIWBSErMAnWPDQwN5kdS2YUeoX27SnFJUb1nLehJFgRsAm8wjaFHvAD1jkxsa2jj2MBDMpZVv2zPmEtmufeLv401ywQpKTlzt+Won79Gm8cxkdOaMPJ3jaBJBp8GnHT6cpCfg/QIlKPu1tbHsW5t1mQy9dPK7t0ylsz2wehkxRgjLGjb1lXCFGol3tEz0IcE9mlJnsMp7ZnjtKtfpPOi9/nR97HNqa5BmKeoI9xkxHPPdSnmh7uouWdHT56QLLo3b0FFAU5enXsC36UQ+oQKxUgr1kaEoduYgTw8ESs19cmC71Q9nwTuepLUpH+ZpF1SW8fj1w++Cs5iIwn1cbrBXsBFTlmovjQFr2LsSBmiYpx7F5ZNK22yo6AYM6oorTjjiKaqEonqCFrep1xEKy4iE6zcyGXSoFaRTz1LxiWwrZS7VxJag2jk49YQXnUXImLtup9vtUH1dqhdo2LRaeNh7/ADGdaxsvrMb2AAAAAElFTkSuQmCC',
  SEND_SMS:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJxSURBVHgB7ZnNahNRGIbf+bGxNKbBYIUaMF1YsChYFKqbaBa9Aruxq/YKuvIq3NQ7cGU3egO66I8uFBoUWhXMwhHShYVIf6h22iTH7zvJ1BpJM2emM5mheeBAOGTCkzPvnPlmPg1Nch8W0zrMOSHwADyigoaPQoin1u38s79TkMI5rX5uERA5RBbNEgeHBetewZLSI8W336It7EDi+uG4kSuuzJD5DOJBGjXYuia0OcQIzdDv65TqW4gTtEnoiCE96bCIpbQJRSaSg1gYvQmvlA/2kV9fhR+UpR1eVn6QgK10zORgBinTgF88S7/4uYn3u9tKx2T7zmPiQgp+8Sy9cM1bRDgefunFoxWOw3Gu9w9gzBz4b/44bs6EZ2k3rNy4ozTPPCqtdVyMQKWZ11sVvNqudPzeWH8Ss0PDcEPg0p9/71H+NztGopy0oyPt0CkSVL25JjRpKdaGL7/25EXqlvBqD/Hv2LDtxgUnlBZZEtpKt9Yrj7+XgN3GfGziwZFw5lXjEbj0lb6ErAw5CinDPJI7khTNm06UpKcyl+XgcvQ5RSFLf8IvgUrnP61i9tKw3H8dYd6Tp0vrbY/ZqVY7/m6g0mV7Hzu1hkTKMPCOIpJNJOS8H0LZ8lh8+usaNhSrwnYELs2nm4X5dn5aeI7H1MUh3KVdwQ2T6YwcKtvaSXiWfkg7ghe6+uTipu5t5cnV0e4+I6rEw+FMx0MbKb5RLbK6Tu9dXlj0pMOC2xdLiBPUV9RFrb6MGMGNUGrS1ufpo4VYICzu3OrWeGFL6LVC9MUFdWzZs9lmduBGKKivqEWoTUe9+iV6jlyGWZ3nBea5P8gn8d/ysJFOAAAAAElFTkSuQmCC',
  SEND_MAIL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANdSURBVHgB7Zk/TBNRHMd/dy1UIn8amkCERgoGkhpIIDrggnbAyQ0XmcCFkQknndxkgU0nnHSRTSYG/uggMQQSiCRthIM0NWBqKGq0hfb5vq89rRp69+7appf0m1y4XN7d+/R3v/f93eOnUE6BjSWvSu5JxugW4agUKbTJGJvVrg09/3OJBHBAydQsEbEAVawUjaVOQ9qNkCagO9ff7lU2sC4Orp4OuALrq2OcfIycIS+lKakqTJkkB0lxqTdVntX95CRxk1DJgapCl0tV6HLJkdBuM4OGvT6avHSZrtZdpFLpw4/vNBs7oMVE3HCs0rn+hhUaMOJroemOHjpJn5l6oBU1utwUrKsnf62H7oW3aO1bouB4w0iPt7RTNPWT7uxsCvBSyV97gV4H+8UbHY1sFRxrmNNIibWvCQGMB672XhcTFA90gAemTQQGKeL3eAzvk1qI0WRSTPSip9c2OIKByCIl8FwZSUHPfzmkiY87IgcxYdDiwrzra+U/vE+cj/Icll0r0paHCTDRSTpNC/zVjjS3St2PVHjS0S3SDesEKSErSz6NiQAeTSVpOtAtct2MMO6Rv0vk72h4W/y1IsvFJTtxFhwwRuCAxRj8YETYKjBkqyJmrXCDFo/jAughB/tXyH/4PNJiPn4kxtu1TttlHAATuzv0igPd52BPu4LU4HL/BsaCQ4GaO4rR1H6YiqGifHvA/gYbmsT5bV7yF7izDNY3CQ/WS/+wt7lo/m4bOuvbfcJvH0d3afbTwX/XprRI0fwdMvXBZAb4wX6Ep8ihuI5iMd7aJoBRTXXBaQBuxzkgy5HGawdwo8v1FzCEIoQFlw+sX8vmub2IW4LOB4bt5QMXku7vdiuqNLReguEaAJCtaDo4KupL/hwr4FLQ2AzoJRh5aaUEQ/ng+BQYbvJJ3S8F7a/x5Ca0t5Cg/IqKhSwjQ/cAJCLcEN2juc8xcRRLAB/afi/OsTBxmAmGITT2bc+uBEXBMNoG2RFSBAvUTNU03CNCI80t3HfbS7qxfccDgsKUb5PnyRR0pan6z5pyqQpdLjkUWqFlcpJ4X1Fl6cwKOUhohPImbWaGn2rkCDENnVtVGwgdMzUdqnxwxju24My1mXWhEUq8r6hUUJuO9+qXeRtuhdxnMwgwrv0C10KOf8EY6j8AAAAASUVORK5CYII=',
  GATEWAY:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPrSURBVHhe7Zo/aBRBFIffbM4ignqxTJpIEI9gEYvYKYgQSyM2NupdqYKcaSxSqEVKzRFILBO7NCKWBpT0sbAQvCYQi1hqUDAQzIz7u525f7nL7e68mTsu+eDYmbvA8vvm7dtxVzrmiCP00SujRZU9GexPE6lRzKWk9XLpxHrlR894FzA+o54JkkVFlNVfGbaklAXfIrwKGJ/ZXw4P+WjWGqmCfHlevNFT53gTECe8wacELwKShDf4kuBcQJrwBh8SnAqwCW9wLcGZAI7wBpcSnAjgDG9wJYFdgIvwBhcSWAW4DG/glsAmwEd4A6cEFgE+wxu4JFgL6EZ4A4cEKwHdDG+wlZBaQC+EN9hISCWgl8Ib0kpILKAXwxvSSEgkgCv8qUGiW5OCLgwTjZwl+r1LtP2T6NNXRRub+o9SklRCbAFc4Z/eFHTvavvTQkThtawc05JEQiwBXOEXCoKuX6ydEiF//FKV8eRY4/e+JHQUwBV+Oiz5uTvR6RBsdlU2lDsuhYV8QLmRaL6xqSi/FMlJSxwJgT62hLPh3b1Sc43Vbb7WISUffv8n7AcAFTE8FI3TEgi5knui7utpS9oK4AyPpmdWFo2uXWkjPH43oCps6SShpQDO8IbZVVX5LK7ZlXUaDpNwoAe4CJ+EtdmguvJTc3aNsJlWPaGhAvDSIjx0LfzDKVENjybIGR6ElVA6X9yb0NMKVQG5Il5Tyed66hX0COwPHt2IChK9AJeLA7IZkZnX4wpVAWJgv8GML9Ac384E1c0RwuNuwL36BiHUBN5N6mmdAKW8C0C5rzyoXfMfwzvA7VeSytvR3BHZwQE6o8c1AUqqHT30xnIYHuUPlsK7w+Nl/uu+EzUBJL7ooRew6vUNb/GDn9tjeJatby/Fdz2tCcBrafyop86p3+XZ/gswCYJk+9ugkrKgh30JFvivzJT0tMKBjVCu+C8fBAKbob4C4ZXcu1YuDTZU+QEBoN8ktAsPWgoA/SLhsPCgoQfUUy5lVqRUTnvC5Bg1PCDhplN40PHsriqh/gEJx8OPZuKEB20rwOCqEi6Hq28YHuKtgrjhQUcBwIWEdxuq+vTn/We+1U8SHiRSz305YBt8OvxwbX+ThgeJa69X7w5pwoNUF1+vSUgbHqTuPr0iwSY8sGq/3ZZgGx5YCQDdksARHlgLAL4lcIUHLAKALwmc4QGbAOBaAnd4wCoAuJLgIjxgFwC4JbgKD5wIAFwSXIYHzgQAWwmuwwOnAkBaCT7CA+cCQFIJvsIDLwJAXAk+wwNvAkAnCb7Dg1hPhLiIniwF55RSzf9xaYdIvtiVwSWf4btOrrg7io+eHnOMd4j+A1kabQNb55dcAAAAAElFTkSuQmCC',
  TIMER:
    'data:image/png;base64,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',
  TIMER_EVENT:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVNSURBVHhe7ZpBaFxFGMe/ea3SCNG0x+SS6qFr9VDBFC9agliPKXiwF+3maKWyxoNCC7bQiB7aLoXmmtR68CIkRytK0IvYHjwoXRExHpJjGyoYUTPj/N/M9L3d7Nt9M29mdqH5wSNvdjev+f/ezDfzZku7POQw/TMqkw0x9liyfYJITKLNOa22mo+spm9GJrqAw3PiQ0a8IYjG9EuGNc75bGwRUQUcnttelD/qqtUdLpJ66wq7rpvBiSagTHhDTAlRBNiEN8SSEFyAS3hDDAlBBVQJbwgtIZgAH+ENISUEEeAzvCGUBO8CQoQ3hJDgVUDI8AbfErwJiBHe4FOCFwExwxt8SagsYBDhDT4kVBIwyPCGqhKcBQxDeEMVCU4Chim8wVWCtYBhDG9wkWAlwCV8bYJodJ86//Nvota6Oi8i//mNe0Trd9V5WWwllBbgeud/vpToMylgi+iFc1y3djL1FNHS6ezz3/wk6Myi0K3y2EgoJcA2/MQBovdnGD0+glCM6gtcvsZo/iSjW78VBxrdx9Ie8Mx7nN5+ldEbLzJqbQi6L8W9YymirIRMdwEud358P9HLzyKsaj89wejQuDrHa0UHwgL0BFwDwTEEcC1bEsaXau+KU7pZSM8ru3Z705VxJ7+/mNCo7AkAYY7PFw8B3P0v5rJ7snxLpIe5lgv9ekKhANfwIC+gKj6u1UtCVwFVwoPOYuaDqjKLJOwQUDU8MALOfm5fwTvBsEAx9NGbukloE4AvLeTHzuumM/luixkBBc0FrAPwu76Gk2TzX749/Wvz0R91OxNQa4jJJOG/62Yl8gI+klPfzFRhqekJetD63WpFsBMh2OqdK8m0bmbTINuzfUSfegeVHAHMDPDKRZ62sSZYuKneU2HVWPcVthuMiSP4blI3cwKECCZgyBgb2UNP6PNMgOBiU596BwuZm2cTWnxL/XPo0mjXxtVqD+cfyJUj6gXOcRhaG5T2klBkAog9KAy+MSE++04FufGt6vpY6f2gh8HHKyIdBuZzK3LYQEhNriCvfelPgLzS2p1L7A/dzATga2m8qZteQSFDHfhaPtwA/ER7456gX6Qcs+LDgU+cPq4K58zz7EFvQWH1ASPeNg1mfU0iOJ/Vp15BV08fbl5Ss8Gbx1R7fH/77HBChsassXxbpE+Nn8hegcK5ItsQUVUCbvBffG9TN1PaBKAXcC68S0BXxh+P7gymnmRpG0+LeXDn0+GwLNL3rs4yOW2pIXBDDgtIcwXhBf9neq3J2mpdmwDQau5d8i0BXb6+oMY4OLPI07Z5+gMQAlGfyvqQB6/hQN3Ao7XLosqEbzVHdgzxHQJACAn9wH4B1gHYNMmTnzEAZNjQKzzoKgD4lICxjZ0hM719dS5J27ijBhRKhMs/OqMOoAbgWJcFE2B5XJZ+4UHfQVVr/FdPEoYHpNKgO5vla36Prxv5fT8IwnBB8esEu0noBa9dLrdKLBMelKoqthKMAJunQXT9+1uq2mM6RNHDBioEojgelb0F4Y2sXpQND0qXVRsJ+KPnX892gsqCgBgGV+tJ21jHMwMWSv12lIFNeFBaAHAZDq6YoWOzNW4bHlgJADEl2OASHlgLAMMmwTU8cBIAhkVClfDAWQAYtISq4UElAWBQEnyEB5UFgNgSfIUHXgSAWBJ8hgfeBIDQEnyHB14FgFASQoQH3gUA3xJChQdBBABfEkKGB8EEgKoSQocHQQUAVwkxwoPgAoCthFjhQRQBoKyEmOFBNAGgn4TY4UHhpmgI1EZrclAI0fk/NTaJ+IUtnjwXM/zAqTW2JnHo5i67RIfof/zCTWhYR0UxAAAAAElFTkSuQmCC'
};

export const const_shape = {
  END_NODE: 'custom-node-circle-end',
  CIRCLE: 'custom-node-circle',
  FLOW: 'custom-node-flow',
  RHOMSBUS: 'custom-node-rhombus'
};

export const code_node = {
  SOURCE: 'SOURCE',
  EVENT: 'EVENT',
  DES: 'DES',
  SEND_SMS: 'SEND_SMS',
  SEND_MAIL: 'SEND_MAIL',
  GATEWAY: 'GATEWAY',
  TIMER: 'TIMER',
  TIMER_EVENT: 'TIMER_EVENT'
};

export interface IListVersion {
  id: string;
  name: string;
  cjVersionId: string;
  cjFolderId: string;
  version: number;
  tags: string;
  status: string;
  contactNumbers: string;
  modifiedDate: string;
  contactCompleted: string;
  currentVersion: string;
  flow: string;
}

export interface ICampaign {
  total: number;
  data: [
    {
      id: string;
      name: string;
      cjVersionId: string;
      cjFolderId: string;
      version: number;
      tags: string;
      status: string;
      contactNumbers: number;
      modifiedDate: string;
    }
  ];
}

export interface IDataTreeFolder {
  id: string;
  name: string;
  path: string;
  parentId: string;
  cjFolders: [
    {
      id: string;
      name: string;
      path: string;
      parentId: string;
      cjFolders: any[];
    }
  ];
}

export interface IListCampaignAuto {
  id: string;
  name: string;
  cjVersionId: string;
  version: number;
  tags: string;
  status: string;
  contactNumbers: number;
  modifiedDate: string;
  contactCompleted: number;
}

export interface IListCustomerVersionProcess {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  state: string;
  processInstanceId: string;
}

export interface IListCustomerInteractive {
  activityId: string;
  activityName: string;
  startTime: string;
  endTime: string;
}

export interface IListTemplateCampaign {
  id: string;
  name: string;
  difficulty: number;
  status: string;
  flow: string;
  description: string;
  thumbnail: string;
}

export interface ISaveCampaign {
  id: string;
  cjId: string;
}

export interface IListValidate {
  nodeId: string;
  nodeCode: string;
  label: string;
  errors: [];
}
