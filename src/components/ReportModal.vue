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
                    <v-row>
                         <v-textarea
                            rows="1"
                            row-height="15"
                            outlined
                            label="Observation"
                        ></v-textarea>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="['Reason 1', 'Reason 2']"
                                label="Reason"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="warning" text @click="displayReport = false">Close</v-btn>
                <v-btn color="primary">Send</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "ReportModal",
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
            return "Do you want report <strong>" + this.candidate.oid + "</strong>?"
        }
    }
}
</script>