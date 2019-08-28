<template>
    <v-dialog v-model="displayReport" max-width="600px">
        <v-card>
            <v-system-bar window dark>
                <div v-html="title"></div>
                <div class="flex-grow-1"></div> 
                <v-icon>close</v-icon>
            </v-system-bar>
            <v-card-text>
                <v-container>
                    <v-flex>
                         <v-textarea
                            v-model="observation"
                            rows="1"
                            row-height="15"
                            outlined
                            label="Observation"
                        ></v-textarea>
                    </v-flex>
                    <v-flex>
                        <v-select
                            v-model="reason"
                            :items="['Reason 1', 'Reason 2']"
                            label="Reason"
                            required
                        ></v-select>
                    </v-flex>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="warning" text @click="displayReport = false">Close</v-btn>
                <v-btn color="primary" @click="sendReport">Send</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "ReportModal",
    data(){
        return {
            observation: null,
            reason: null
        }
    },
    computed: {
        displayReport: {
            get(){
                return this.$store.getters.getDisplayReport;
            },
            set(value){
                this.$store.dispatch("displayReport", value)
            }
        },
        candidate() {
            return this.$store.getters.getAlert;
        },
        title() {
            return "Do you want report <strong>" + this.candidate!=null? this.candidate : "" + "</strong>?"
        }
    },
    methods: {
        sendReport(){
            let report = {
                object: this.candidate.oid,
                observation: this.observation,
                reason: this.reason,
                author: 1,
                source: "SN Hunter"
            }
            this.$store.dispatch("doReport", report)
        }
    }
}
</script>